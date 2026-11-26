# 02. Physical and Data Link Essentials

Signals, transmission media, Ethernet frames, MAC addressing, ARP, switching, VLANs, and STP.

### Signals - analog vs digital

A **signal** is the physical form of data travelling through a medium. Networks carry data as electrical pulses, light pulses, or radio waves.

- **Analog** - continuous wave form where values change smoothly. Example: old radio voice transmission

- **Digital** - discrete values, usually 0 and 1 represented as pulses. Example: Ethernet uses pulses, fiber uses light on and off

In modern networks we mostly send digital data, but the physical carrier can look like an analog wave.

### Media - UTP, STP, fiber, wireless

**Media** means the path that carries signals. It decides speed, distance, noise resistance, and cost.

- **UTP** - Unshielded Twisted Pair Most common Ethernet cable. Twisting reduces noise.

- **STP** - Shielded Twisted Pair Like UTP but with shielding to reduce interference. Used in noisy areas.

- **Fiber** - Optical Fiber Uses light pulses. Very fast and long distance. Low interference.

- **Wireless** Uses radio waves like Wi-Fi. Convenient but interference and walls affect it.

Simple idea: UTP is cheap and common, fiber is fastest and farthest, wireless is flexible but variable.

### MAC address - role and format

**MAC** means **Media Access Control**. A **MAC address** is the hardware address used for local delivery on the same network segment. Switches use MAC addresses to forward frames.

Role

Identify a network interface on a local link (Layer 2).

Format

48-bit address written as 6 bytes in hex. Example: "AA:BB:CC:11:22:33"

IP is for routing across networks. MAC is for delivery inside a local network.

### Framing, MTU, MSS

At Data Link layer, data is packed into a **frame**. A frame is like an envelope that includes source MAC, destination MAC, and error check information.

Frame

Data Link unit that wraps a network layer packet with MAC info.

MTU

**MTU** is **Maximum Transmission Unit**. Largest frame payload allowed on a link. Example: Ethernet MTU is often 1500 bytes (payload)

MSS

**MSS** is **Maximum Segment Size**. TCP data size that fits inside IP without fragmentation. Rough idea: MSS is MTU minus headers

MTU is about link size. MSS is about TCP payload size. Both can cause weird web issues when mismatched.

### Error detection - CRC

**CRC** means **Cyclic Redundancy Check**. It is an error detection method used to detect if bits got corrupted during transmission.

- Sender calculates a CRC value and adds it to the frame.

- Receiver recalculates CRC and compares.

- If mismatch, the frame is considered corrupted and discarded.

CRC detects errors, it does not fix them. Fixing happens by retransmission in higher layers like TCP.

### ARP basics

**ARP** means **Address Resolution Protocol**. It finds the MAC address for a given IP address inside a local network.

I know IP - Need MAC - ARP request - ARP reply

- Device sends an ARP broadcast: "Who has this IP"

- The owner replies with its MAC address

- Result is stored in ARP cache for some time

ARP is for IPv4. IPv6 uses a different approach called Neighbor Discovery.

### Switch basics - CAM table and flooding

A **switch** is a Layer 2 device that forwards frames using MAC addresses. It learns which MAC address is on which port and builds a table.

CAM table

**CAM** is **Content Addressable Memory**. Switch stores "MAC to port" mappings here. Example: "AA:BB:CC:11:22:33" is on port 5

Learning

Switch learns source MAC of incoming frames and records the port.

Flooding

If destination MAC is unknown, switch sends the frame to all ports except the source port. Once destination replies, switch learns it and flooding reduces.

Flooding is normal at first. Too much flooding can indicate loops or misconfiguration.

### VLAN basics - tagging concept

**VLAN** means **Virtual Local Area Network**. It splits one physical switch into multiple logical networks. Devices in different VLANs are separated like they are on different switches.

- **Access port** - carries traffic for one VLAN (end devices connect here)

- **Trunk port** - carries traffic for multiple VLANs between switches

- **Tagging** - frames carry a VLAN ID so switches know which VLAN it belongs to

VLAN helps isolation and security. Communication between VLANs needs routing (Layer 3).

### STP basics - loops are dangerous

**STP** means **Spanning Tree Protocol**. It prevents Layer 2 loops when switches are connected in a way that creates multiple paths.

- Loop can cause broadcast storms because frames keep circulating.

- Switch CAM table can keep changing, causing unstable forwarding.

- STP blocks some ports so there is only one active path between switches.

We keep redundant links for safety, but STP ensures only one path is active to avoid loops.

Quick memory

Physical is signals and media. Data Link is frames, MAC, switching, VLAN, and loop protection.
