# 08. Wireless and Mobile Networks

Wi-Fi, cellular networks, roaming, wireless security, and radio fundamentals.

### Wi-Fi basics

**Wi-Fi** is wireless networking based on IEEE 802.11 standards. It lets devices connect to a local network using radio waves.

SSID

**Service Set Identifier** - the Wi-Fi network name you see. Example: "Ash-Home-5G"

BSSID

**Basic Service Set Identifier** - the access point identifier, usually its MAC address. Useful when multiple access points share the same SSID.

WPA2

**Wi-Fi Protected Access 2** - common Wi-Fi security standard. Uses strong encryption (typically AES) for protection.

WPA3

**Wi-Fi Protected Access 3** - newer and stronger security than WPA2. Better protection against password guessing attacks.

Simple rule: use WPA3 if available, otherwise WPA2 is still standard for most networks.

### 2.4 GHz vs 5 GHz

**GHz** means gigahertz, a unit of frequency. Wi-Fi uses radio frequency bands, most commonly 2.4 GHz and 5 GHz.

2.4 GHz

- Better **range** - travels farther and through walls

- Usually more **interference** - many devices use it

- Often lower **speed** compared to 5 GHz

5 GHz

- Higher **speed** - better for streaming and fast downloads

- Lower **range** - weaker through walls

- Usually less **interference** than 2.4 GHz

Quick pick: close to router use 5 GHz, far or many walls use 2.4 GHz.

### Access point vs router

People often call everything "Wi-Fi", but devices have different roles. Understanding this makes troubleshooting easier.

AP

**Access Point** - provides Wi-Fi to devices and connects them to the local network. Think: "Wi-Fi transmitter for your LAN"

Router

Sends traffic between networks. Connects your home network to the internet (WAN). Home "router" is usually router + switch + access point in one box.

Modem

**Modulator Demodulator** - converts ISP signal to usable internet connection. Fiber setups often use ONT, not classic modem.

If Wi-Fi works but internet does not, AP is fine but router or ISP link may be the issue.

### Bluetooth

**Bluetooth** is a short-range wireless technology used mainly for personal devices. It is designed for low power and quick connections.

- Use cases: earphones, keyboard, mouse, smartwatch, car audio

- Range: usually a few meters to tens of meters depending on device class

- Bluetooth is not for normal internet browsing like Wi-Fi, it is more for device-to-device links

Wi-Fi is for network and internet. Bluetooth is for nearby device connection.

### Cellular high level

**Cellular network** is mobile internet provided by telecom companies. The area is split into cells, each served by a base station (mobile tower). Your phone connects to the nearest cell and moves between cells as you travel.

SIM

**Subscriber Identity Module** - identifies you to the carrier network.

LTE

**Long Term Evolution** - commonly called 4G.

5G

Fifth Generation mobile network - higher speed and lower latency in many cases.

Base station

Mobile tower equipment that connects phones to the carrier network.

In simple words: Wi-Fi connects you to a local router. Cellular connects you to a carrier tower.

Security note

Prefer HTTPS sites on both Wi-Fi and cellular. Public Wi-Fi can be risky if misconfigured.

Quick memory: 2.4 GHz is range, 5 GHz is speed. Router connects networks, AP gives Wi-Fi.
