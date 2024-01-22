---
slug: Hackintosh-B460M-MORTAR-WIFI-EFI-installation
title: Hackintosh B460M-MORTAR WIFI Installation Record
tags:
  - Hackintosh
  - Installation
categories:
  - Hackintosh
date: 2021-06-08T17:38:35.000Z
keywords:
  - Hackintosh EFI
  - MSI B460M-MORTAR-WIFI
  - Hackintosh Configuration
  - Hackintosh Installation Tutorial
  - i5-10400 Hackintosh
  - Monterey
  - RX6600
authors: Alan
description: Hackintosh B460M-MORTAR WIFI Installation Tutorial
out_dated: true
summary: >-
  This article records the process of the author installing Hackintosh,
  including hardware configuration, downloading the image and making the
  installation image, setting BIOS, installing macOS, system settings, and
  moving EFI files to the disk. The author uses MSI B460M MORTAR Wifi
  motherboard, Intel i5 10400 CPU, Kingston HyperX memory, Intel UHD Graphics
  630 graphics card, Kioxia RC10 SSD, Zhenhua LEADEX G 550 power supply, Patriot
  M2 white chassis, and Jonsbo CR-1000 white heat sink. The author successfully
  installed macOS 11.3.1 and tested functions such as sleep/wake, all USB ports,
  nuclear display hardware acceleration, sound card output, Bluetooth, wifi, and
  the time difference between windows and mac.
ai_translation: true
---

Hackintosh B460M-MORTAR WIFI + i5-10400 Installation

<!--truncate-->

This article mainly records the process of my installing Hackintosh.
This is my [EFI repository address](https://github.com/3Alan/Hackintosh-i5-10400-B460M-MORTAR-WIFI)

## Version Information

- MacOS 11.3.1
- Boot method `opencore`

## Hardware Configuration

| Component | Model                                     |
| ---- | ---------------------------------------- |
| Motherboard | MSI B460M MORTAR Wifi                   |
| CPU  | Intel i5 10400                           |
| Memory | Kingston HyperX RGB light bar 8GB \* 2 2666MHz |
| Graphics Card | Intel UHD Graphics 630 (CPU built-in core display) |
| SSD  | Kioxia RC10 512GB \* 2                     |
| Power Supply | Zhenhua LEADEX G 550                        |
| Chassis | Patriot M2 white                           |
| Heat Dissipation | Jonsbo CR-1000 white                      |

## Function Test

- [x] Sleep/wake
- [x] All USB ports
- [x] Nuclear display hardware acceleration
- [x] Sound card output
- [x] Bluetooth
- [x] wifi
- [x] Time difference between windows and mac

## Download the Image and Make the Image U Disk

1. The image of Heiguoguo's Little Soldier `11.3.1`, after downloading, use WinMD5 to check the image and compare whether the md5 value is the same. The purpose of this step is to ensure the integrity of the downloaded image.
2. Use `balenaEtcher` to make the installation image (run as administrator).
3. After the installation is complete, use the disk management tool `diskgenius` to replace the `EFI` file of the U disk with its own `EFI` file.

## Set BIOS

- Set U disk as the first boot item

## Install MacOS

1. Enter the OC boot page
2. Select `Install macOS Big Sur`
3. Wait for a series of installation processes to enter the installation interface
4. Select Disk Utility, `Select Show All Devices` in the upper left corner
5. Select the disk on which to install MacOS, click Erase, name: `any, can be distinguished`, format: `APFS`, scheme: `GUID partition map`, after erasing, return to the previous interface and click `Install macOS`.
6. After a series of operations, the installation is complete

## System Settings

First open the terminal and enter a few commands:

```
sudo spctl --master-disable    # Enable macOS to install applications to allow any source
sudo kextcache -i /            # Rebuild the cache
```

If for some reason, you have modified some drivers in /System/Library/Extensions/ or /Library/Extensions/, please use the following command to rebuild the cache:

```
sudo chown -R root:wheel /System/Library/Extensions/
sudo chmod -R 755 /System/Library/Extensions/
sudo kmutil install --update-all
sudo kcditto
```

## Move EFI Files to Disk

This step is to allow the system to enter the Mac system without the U disk.
This step can be done using hackintool, mount your disk and the EFI partition of the U disk, and then copy EFI to the EFI partition of the disk.
Finally, unplug the U disk, and the Hackintosh installation is complete.

> Reference
> https://mp.weixin.qq.com/s/UNtxsMIaKISyH6uRNt0LzQ > https://github.com/cheneyxx/Hackintosh-10400-B460M-MORTAR
