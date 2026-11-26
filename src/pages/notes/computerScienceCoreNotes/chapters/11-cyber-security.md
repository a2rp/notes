# 11. Cyber Security

Threats, vulnerabilities, authentication, defense layers, and security practices.

Cyber Security

At-a-glance revision for web security, secure coding, authentication, and network threats.

Collapse

OWASP Top 10

- OWASP Top 10 lists the most critical web security risks.

- It is updated periodically based on real-world vulnerability data.

- Understanding it makes you interview-ready and production-aware.

What is OWASP

OWASP stands for Open Worldwide Application Security Project.

It is a global community that publishes security standards and best practices.

Common categories

- Broken access control

- Cryptographic failures

- Injection attacks

- Security misconfiguration

- Vulnerable components

XSS - Cross Site Scripting

- XSS allows attackers to inject malicious scripts into web pages.

- Happens when user input is rendered without proper escaping.

- Main types are Stored, Reflected, and DOM-based.

How XSS works

If a web app inserts user input directly into HTML without sanitizing it, an attacker can inject JavaScript.

The browser executes it as if it came from the trusted website.

Example

- User submits: <script>alert('Hacked')</script>

- If not escaped, the script runs in other users' browsers.

Prevention

Escape output before rendering.

Use frameworks that auto-sanitize.

Implement Content Security Policy.

CSRF - Cross Site Request Forgery

- CSRF tricks users into performing unwanted actions.

- Relies on authenticated sessions.

- Uses hidden forms or malicious links.

How CSRF works

If a user is logged into a bank site and visits a malicious site, that site can send a forged request to the bank.

Because cookies are automatically included, the bank thinks the request is valid.

Example

- Hidden form auto-submits transfer request.

- Bank processes it because user session is valid.

Prevention

Use CSRF tokens.

SameSite cookies.

Double-submit cookie strategy.

SQL Injection

- SQL Injection occurs when input is concatenated into SQL queries.

- Allows attackers to read, modify, or delete database data.

- Parameterized queries prevent this.

How it happens

If user input is directly inserted into a query string, attacker can manipulate SQL logic.

Example

- Input: ' OR 1=1 --

- Query becomes always true, returning all users.

Prevention

Use prepared statements.

Use ORM frameworks safely.

Validate and sanitize inputs.

Authentication Flaws

- Weak passwords and poor session management cause breaches.

- Broken authentication exposes user accounts.

- Multi-factor authentication improves security.

Common flaws

Weak password policies.

Session IDs not rotated.

No rate limiting on login attempts.

Example

- Brute force attack tries many passwords.

- Without rate limiting, attacker eventually succeeds.

Prevention

Hash passwords with bcrypt or Argon2.

Enable MFA.

Implement account lockout and rate limiting.

Secure Coding

- Security should be built into code from day one.

- Validate input, sanitize output.

- Follow least privilege principle.

Best practices

Never trust user input.

Use HTTPS everywhere.

Keep dependencies updated.

Apply principle of least privilege.

Mental model

- Assume attackers will try to break your app.

- Design defensively.

Network Attacks

- Attackers exploit network weaknesses.

- Includes MITM, DDoS, and packet sniffing.

- Encryption and monitoring reduce risk.

Common attacks

Man-in-the-Middle intercepts communication.

DDoS overwhelms servers with traffic.

Packet sniffing captures unencrypted data.

Example

- Public WiFi without HTTPS allows traffic inspection.

Prevention

Use TLS encryption.

Deploy firewalls.

Use intrusion detection systems.
