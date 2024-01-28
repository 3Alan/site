---
slug: Hackintosh-B460M-MORTAR-WIFI-EFI-installation
title: Hackintosh B460M-MORTAR WIFI Installation Guide
tags:
  - Hackintosh
  - Build
categories:
  - Hackintosh
date: 2021-06-08T17:38:35.000Z
keywords:
  - Hackintosh EFI
  - MSI B460M-MORTAR-WIFI
  - Hackintosh configuration
  - Hackintosh installation tutorial
  - i5-10400 Hackintosh
  - Monterey
  - RX6600
authors: Alan
description: Hackintosh B460M-MORTAR WIFI Installation Tutorial
out_dated: true
summary: >-
  This article documents the author's process of installing Hackintosh,
  including hardware configuration, downloading the image and creating the
  installation image, setting up the BIOS, installing macOS, system settings,
  and moving the EFI file to the disk. The author used a MSI B460M MORTAR Wifi
  motherboard, Intel i5 10400 CPU, Kingston HyperX Fury RAM, Intel UHD Graphics
  630 GPU, Corsair RC10 SSD, ZHENHUA LEADEX G 550 power supply, Patriot M2 white
  case, and Jonsbo CR-1000 white cooler. The author successfully installed macOS
  11.3.1 and tested functions such as sleep/wake, all USB ports, hardware
  acceleration of integrated graphics, audio output, Bluetooth, Wi-Fi, and the
  time synchronization issue between Windows and macOS.
ai_translation: true
---

# Hackintosh B460M-MORTAR WIFI + i5-10400 Hackintosh Installation

<!--truncate-->

This article mainly documents the process of installing Hackintosh.

Here is the [link to my EFI repository](https://github.com/3Alan/Hackintosh-i5-10400-B460M-MORTAR-WIFI)

## Version Information

- MacOS 11.3.1
- Bootloader: OpenCore

## Hardware Configuration

| Component | Model                                         |
| --------- | --------------------------------------------- |
| Motherboard | MSI B460M MORTAR Wifi                          |
| CPU       | Intel i5 10400                                 |
| RAM       | Kingston HyperX Fury RGB Memory 8GB \* 2 2666MHz |
| GPU       | Intel UHD Graphics 630 (integrated with CPU)    |
| SSD       | Corsair RC10 512GB \* 2                         |
| Power Supply | ZHENHUA LEADEX G 550                          |
| Case      | Patriot M2 White                               |
| Cooler    | Jonsbo CR-1000 White                           |

## Function Testing

- [x] Sleep/Wake
- [x] All USB ports
- [x] Hardware acceleration of integrated graphics
- [x] Audio output
- [x] Bluetooth
- [x] Wi-Fi
- [x] Time synchronization issue between Windows and macOS

## Downloading and Creating USB Installer

1. Download the macOS image `11.3.1` from Hackintosh Build.
   After downloading, use WinMD5 to check if the md5 value matches. This step ensures the integrity of the downloaded image.
2. Use `balenaEtcher` to create the installation image (run as administrator).
3. After the installation is complete, use the disk management tool `diskgenius` to replace the `EFI` file on the USB drive with the appropriate `EFI` file for your configuration.

## BIOS Settings

- Set the USB drive as the first boot option.

## Installing MacOS

1. Enter the OpenCore boot page.
2. Select `Install macOS Big Sur`.
3. Wait for the installation process to complete and enter the installation interface.
4. Select Disk Utility and click on `Show All Devices` in the upper-left corner.
5. Select the disk where you want to install macOS, click Erase, and set the name as desired, format as `APFS`, and scheme as `GUID Partition Map`. After erasing, go back to the previous screen and click `Install macOS`.
6. Follow a series of prompts to complete the installation.

## System Settings

Start by opening Terminal and entering the following commands:

```bash
sudo spctl --master-disable    # Enable installation from any source on macOS
sudo kextcache -i /            # Rebuild cache
```

If for any reason you modified certain drivers in `/System/Library/Extensions/` or `/Library/Extensions/`, use the following commands to rebuild the cache:

```bash
sudo chown -R root:wheel /System/Library/Extensions/
sudo chmod -R 755 /System/Library/Extensions/
sudo kmutil install --update-all
sudo kcditto
```

## Moving the EFI File to the Disk

This step allows the system to boot from the disk instead of the USB drive.
You can use Hackintool to complete this step. Mount the EFI partitions of both your disk and the USB drive, then copy the EFI folder from the USB drive to the EFI partition of the disk.
Finally, remove the USB drive. With that, the Hackintosh installation is complete.

> References:
> [https://mp.weixin.qq.com/s/UNtxsMIaKISyH6uRNt0LzQ](https://mp.weixin.qq.com/s/UNtxsMIaKISyH6uRNt0LzQ)
> [https://github.com/cheneyxx/Hackintosh-10400-B460M-MORTAR](https://github.com/cheneyxx/Hackintosh-10400-B460M-MORTAR)
