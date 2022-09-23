---
title: react Upload 组件
date: 2022-01-10 22:31:58
tags:
  - React
  - 组件库
  - Upload
categories:
  - 前端
  - React
keywords: 
 - react组件库
 - Upload 组件
 - react 上传组件
 - react 拖拽上传
description: react Upload 组件，包括普通上传、拖拽上传、上传进度
sidebar_label: Upload 组件
sidebar_position: 2
---

下面的代码已经去除了大部分与主线无关的代码。

## 效果查看
- [地址](https://alan-ui.vercel.app/?path=/docs/components-upload--text-list)
- [源码](https://github.com/3Alan/alan-ui)

## 需求分析
- 上传文件
- 展示文件上传状态（成功/失败/上传中）
- 受控/非受控组件
- 拖拽上传

## 暴露的API
```ts
export interface UploadProps {
  // 上传文件对应的服务器地址
  action?: string;
  fileList?: UploadFile[];
  onChange?: (e: OnChangeEvent) => void;
  /** 返回 false 会中断上传 */
  beforeUpload?: (fileList: File[]) => File[] | Promise<File[]> | boolean;
}
```

## 基本代码
直接使用原生的 `input` 来实现
```js
const onChange = (e) => {
  // 即为需要上传的File对象
  console.log(e.target.files[0])
}


<input type="file" onChange={onChange} />
```
并将该File对象添加到FormData中最后发送给服务器。
```js
const formData = new FormData();

// file即为上面通过input拿到的文件对象
formData.append('file name', file);
```

最后发送给服务端
```js
axios.post(url, formData);
```

其实上面的代码基本上就是核心的代码了，只不过我们需要在这中间穿插一些其他状态的管理，例如自定义input的样式，增加上传进度等等...

## 自定义触发input的元素
首先将原有的input通过`display: none`隐藏掉，然后通过ref的方式获取input，在需要绑定的元素上触发input的click事件即可。
```tsx
const inputRef = useRef<HTMLInputElement>(null);
const onOpenResource = (e: MouseEvent) => {
  e.stopPropagation();
  if (inputRef.current) {
    inputRef.current.click();
  }
};


<div onClick={onOpenResource}>
  <input
    ref={inputRef}
    type="file"
    accept={accept}
    onChange={onInternalChange}
    multiple={multiple}
    disabled={disabled}
  />
  {children}
</div>
```

## 拖拽上传
和普通的点击上传几乎没有区别，只是在获取`File`对象时是通过`e.dataTransfer.files`来获取的。

## 状态的管理
我们在组件的内部自己维护一个`fileList`，并为其加上一系列状态
```ts
const [internalFileList, setInternalFileList] = useState([]);
```

`internalFileList` 包含的属性
```ts
export interface UploadFile {
  // 文件名
  name?: string;
  // 文件唯一id
  uid?: string;
  // 文件当前状态（uploading,done,error,removed,canceled）
  status?: string;
  // 上传成功后服务器返回的图片地址
  url?: string;
  // 上传进度
  percent?: number;
  // 原文件对象，也就是最后要用来上传的对象
  rawFile?: File;
}
```

## updateStatus 方法
后面会多次用到了该方法，其实就是通过uid找到对应项目，修改其属性并调用`onChange`的操作
```ts
const updateStatus = (
  currentTask: UploadFile,
  info: { status?: string; url?: string | ArrayBuffer; percent?: number }
) => {
  let newFileList: UploadFile[] = [];
  let currentFile = {};

  setInternalFileList((prev) => {
    newFileList = prev.map((task) => {
      if (task.uid !== currentTask.uid) return task;

      currentFile = {
        ...task,
        name: currentTask.rawFile?.name,
        uid: currentTask.uid,
        ...info
      };
      return currentFile;
    });
    return newFileList;
  });

  onChange?.({ file: { ...currentFile, rawFile: currentTask.rawFile }, fileList: newFileList });
};
```

## 组件的生命周期 beforeUpload
先看代码
```ts
// 在onChange中调用，将input中获取的files传入
const handleUploadTasks = async (files: File[]) => {
  let handledFiles = files;
  if (beforeUpload) {
    const shouldUpload = await beforeUpload(files);
    if (shouldUpload) {
      handledFiles = shouldUpload as File[];
    } else {
      // 该变量用来在真正发送请求的时候做是否中断判断
      shouldUploadRef.current = false;
    }
  }

  // 为beforeUpload处理好后的List添加状态
  const newTasks: UploadFile[] = handledFiles.map((file) => ({
    uid: getUid(),
    status: UploadStatus.UPLOADING,
    name: file.name,
    rawFile: file
  }));

  setInternalFileList((prev) => [...prev, ...newTasks]);
  
  // 上传操作，下面会介绍到
  await upload(newTasks);
};
```
```ts
/** 返回 false 会中断上传 */
beforeUpload?: (fileList: File[]) => File[] | Promise<File[]> | boolean;
```
该生命周期会将当前用户选中的文件当做参数传递进去，用户可以返回一个新的文件列表或者返回false。这在当需要根据文件大小来中断上传操作的场景中很适用。

## 文件上传
```ts
const upload = async (tasks: UploadFile[]) => {
  // beforeUpload生命周期返回false时的中断处理
  if (!shouldUploadRef.current) {
    tasks.map(async (currentTask) => {
      // 将内部状态更新为canceled并中断上传
      updateStatus(currentTask, { status: UploadStatus.CANCELED, url: '' });
    });
    return;
  }

  await Promise.all(
    tasks.map(async (currentTask) => {
      try {
        // 进行post请求
        const result = await post(currentTask);
        // 将内部状态更新为done
        updateStatus(currentTask, { status: UploadStatus.DONE, url: result.url });
        alert(`${currentTask.rawFile?.name} success!`);
      } catch (e) {
        // 将内部状态更新为error
        updateStatus(currentTask, { status: UploadStatus.ERROR, url: '' });
        alert(`${currentTask.rawFile?.name} failed!`);
        throw e;
      }
    })
  ).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};
```

post 函数非常简单就是上前面提到的formData操作
```ts
const post = async (currentTask: UploadFile): Promise<ResponseData> => {
  const formData = new FormData();
  const { rawFile } = currentTask;

  formData.append(rawFile.name, rawFile);

  const res = await axios.post(action, formData);
  return res.data;
};
```

## 文件的删除
通过uid找到对应项进行删除即可
```ts
const onRemove = (file: UploadFile) => {
  const removedFileList = internalFileList.filter((item) => item.uid !== file.uid);

  setInternalFileList(removedFileList);
};
```

## 上传进度
涉及知识点：
使用到了 `XMLHttpRequest.upload.progress`，`axios` 将其包装成了 `options.onUploadProgress`，我们只要稍稍修改一下前面的 `post` 方法就行
```ts
axios.post(url, formData, {
  onUploadProgress: (e: ProgressEvent) => {
    // 更新上传进度
    updateStatus(currentTask, {
      status: UploadStatus.UPLOADING,
      percent: Math.round((e.loaded * 100) / e.total)
    });
  }
});
```

## 文件列表展示
上面我们拿到了处理后的文件列表，至于文件列表的实现没有什么难点了，我们只需要使用`internalFileList`的percent、status...属性即可。这里就不做过多的介绍了。
```tsx
// 具体实现不做介绍
<FileList onRemove={onRemove} items={internalFileList} />
```

