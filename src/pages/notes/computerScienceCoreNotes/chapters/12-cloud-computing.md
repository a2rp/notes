# 12. Cloud Computing

Cloud service models, deployment patterns, scaling, storage, and operations.

Cloud Computing

At-a-glance revision notes for cloud models, deployment styles, scaling, and security basics.

Collapse

Scan the "At a glance" bullets first. Then read examples for real understanding.

IaaS

Quick revision points and beginner examples

At a glance

- Infrastructure as a Service gives you virtual machines, networking, and storage.

- You manage OS, runtime, patches, and your app.

- Good when you need control and custom setups.

What it means

IaaS provides the raw building blocks like compute (VMs), storage, and networks.

You choose OS, install software, configure security, and deploy your application.

Example

- You rent a VM, install Ubuntu, set up Nginx, deploy Node app, and manage updates yourself.

When to use

Use IaaS when you need full control over the server environment.

Useful for custom networking, legacy systems, or special performance tuning.

Quick trade-off

- More control - more responsibility for maintenance and security.

You manage vs provider manages

You manage

OS, patches, runtime, app code, configs, monitoring setup

Provider manages

Physical servers, virtualization layer, data center, base networking

PaaS

Quick revision points and beginner examples

At a glance

- Platform as a Service gives you a managed runtime to deploy apps faster.

- You focus on code and app config, platform handles servers and OS.

- Great for rapid development and standard web apps.

What it means

PaaS provides a platform where you deploy code and the platform handles OS, runtime, scaling basics, and infrastructure.

You configure environment variables, deployment settings, and app resources.

Example

- You push your app, platform builds and runs it, handles HTTPS, restarts, and basic scaling.

When to use

Use PaaS when you want faster deployment without managing servers.

Best for APIs, web apps, and standard workloads.

Quick trade-off

- Less server control - faster shipping and easier ops.

You manage vs provider manages

You manage

App code, app settings, env variables, database usage patterns

Provider manages

OS, runtime, patching, underlying infra, typical autoscaling hooks

SaaS

Quick revision points and beginner examples

At a glance

- Software as a Service is a ready product delivered over the internet.

- You just use it, provider manages everything.

- Best when you need a tool, not a platform.

What it means

SaaS is a complete application delivered to users.

You do not manage infrastructure or runtime. You only configure usage and permissions.

Example

- Email service, project management tools, analytics dashboards, CRM systems.

When to use

Use SaaS when you need a business capability quickly.

It saves time and reduces engineering overhead for non-core problems.

Quick trade-off

- Fast adoption - less customization and less control.

You manage vs provider manages

You manage

Users, roles, permissions, configuration and workflows

Provider manages

Everything else including app, updates, infra, security controls

Virtualization

Quick revision points and beginner examples

At a glance

- Virtualization lets one physical machine run many virtual machines.

- Hypervisor creates isolated VMs with their own OS.

- Foundation of most IaaS systems.

Core idea

A hypervisor slices CPU, memory, and storage to create multiple VMs.

Each VM runs its own OS and behaves like a real machine.

Example

- One physical server runs 20 VMs, each hosting different applications.

Why it matters

Improves hardware utilization and isolation.

Allows flexible provisioning, snapshots, and migration of workloads.

Mental model

- VM is a full computer inside your computer.

Containers

Quick revision points and beginner examples

At a glance

- Containers package app plus dependencies into a single unit.

- They share the host OS kernel, so they are lighter than VMs.

- Great for portability and consistent deployments.

Core idea

Containers isolate apps using OS-level features while sharing the same kernel.

They start fast and consume fewer resources than VMs.

Example

- Docker image contains Node app, dependencies, and config. Runs the same on laptop and cloud.

Containers vs VMs

VM includes full OS. Container shares OS kernel.

VM isolation is stronger, container is lighter and faster.

Quick compare

- VM - heavier, strong isolation

- Container - lighter, faster startup

Why containers are loved

Portability

Same image runs everywhere

Consistency

Dev, staging, production behave similarly

Speed

Fast startup and efficient resource usage

Serverless

Quick revision points and beginner examples

At a glance

- You deploy functions, cloud runs them on demand.

- You do not manage servers, scaling happens automatically.

- Best for event-driven tasks and APIs with bursts.

Core idea

Serverless means you write function code and the provider handles execution, scaling, and infrastructure.

Billing is often based on usage, not always-on servers.

Example

- An API endpoint runs as a function. It wakes up when called and scales when traffic increases.

Trade-offs

Cold start can add latency when the function is idle.

You must design for stateless behavior and external state storage.

Quick trade-off

- Low ops - watch out for cold start and limits.

Scaling strategies

Quick revision points and beginner examples

At a glance

- Scale up means bigger machine. Scale out means more machines.

- Autoscaling reacts to metrics like CPU, memory, request rate.

- Caching and queues help handle spikes safely.

Vertical scaling (scale up)

Increase resources of a single machine like CPU or RAM.

Simple but has limits and can require downtime.

Example

- Upgrade server from 2 CPU to 8 CPU when load grows.

Horizontal scaling (scale out)

Add more instances and distribute load using a load balancer.

More reliable and scalable for big traffic.

Example

- Run 10 app instances behind a load balancer instead of 1 huge server.

Support tools

Caching reduces repeated work and database load.

Queues smooth traffic spikes by buffering jobs.

CDNs speed up content delivery for global users.

Example

- Use cache for product list, queue for sending emails, CDN for images.

Scaling checklist

Stateless services

Store sessions in shared storage or tokens

Health checks

Load balancer removes unhealthy instances

Rate limiting

Protect against abuse and sudden spikes

Cloud security

Quick revision points and beginner examples

At a glance

- Security is shared responsibility between you and provider.

- Identity and access control is the first line of defense.

- Encryption + monitoring reduce risk and blast radius.

Shared responsibility model

Provider secures the physical data center and core cloud services.

You secure your data, identity access, configurations, and app-level security.

Example

- If your storage bucket is public by mistake, that is on you, not the provider.

Identity and access management

Use least privilege. Give minimal permissions required for each role.

Use separate environments, rotate keys, and avoid long-lived secrets in code.

Example

- Backend service account can read one bucket only, not full admin access.

Encryption and monitoring

Encrypt data at rest and in transit.

Enable logs and alerts for unusual access patterns.

Use network segmentation and firewall rules to reduce exposure.

Example

- TLS for API traffic, encryption for database storage, alerts for failed logins.

Practical mindset

- Assume misconfigurations will happen.

- Reduce blast radius using least privilege and network segmentation.

- Detect fast with logs and alerts.

Common security checks

Public access

Ensure storage and databases are not publicly exposed

Secrets

Use secret manager, do not hardcode keys

Network rules

Restrict inbound traffic to only required ports

Backups

Enable backups and test recovery

Interview tip - Always explain cloud choices using trade-offs like control vs convenience, cost vs performance, and security vs speed.
