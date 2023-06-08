import Translate from '@docusaurus/Translate';
import React from 'react';
import { FaAlipay, FaCoffee, FaWeixin } from 'react-icons/fa';
import IconButton from '../iconButton';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import './index.scss';

const cls = 'donate';

export default function Donate() {
  return (
    <div className={cls}>
      <span className={`${cls}-label`}>
        <Translate id="component.donate.label">请作者喝可乐：</Translate>{' '}
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton ariaLabel="Alipay">
            <FaAlipay color="#00a0e9" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <img width={150} height={150} src="/img/qrcode/alipay.png" alt="alipay qrcode" />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton ariaLabel="Wechat">
            <FaWeixin color="#07c160" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <img width={150} height={150} src="/img/qrcode/wechat.png" alt="wechat qrcode" />
        </PopoverContent>
      </Popover>
      <IconButton ariaLabel="Kofi" href="https://ko-fi.com/N4N1L5Y7V">
        <FaCoffee color="#ff5d5e" role="img" aria-label="Kofi" />
      </IconButton>
    </div>
  );
}
