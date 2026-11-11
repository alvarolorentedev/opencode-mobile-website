---
title: Terms of Use
description: Read the terms governing use of OpenCode Mobile, including its open-source license, acceptable use, liability, changes, and contact details.
layout: ../layouts/MarketingLayout.astro
prose: true
---
# OpenCode Mobile — Terms of Use

**Effective date:** November 11, 2026
**Last updated:** November 11, 2026
**Version:** 1.0
**Website:** https://getopencode.app  
**Software repository:** https://github.com/alvarolorentedev/opencode-mobile

## 1. Introduction

These Terms of Use ("Terms") govern the use of OpenCode Mobile (the "Application" or "App"), an independent, open-source mobile client for interacting with OpenCode servers.

The Application is maintained and distributed by Alvaro Lorente ("Maintainer", "Service Provider", "we", "us", or "our").

By downloading, installing, or using an official distribution of the Application, you acknowledge these Terms and agree to comply with the applicable conditions of use.

If you do not agree with these Terms, you may stop using and uninstall the Application. Your rights under the applicable open-source license are not conditional on accepting these Terms.

**Important:** OpenCode Mobile allows you to control development environments, execute instructions through AI agents, interact with terminals, and modify files on computers or servers. You are responsible for securing the systems you connect to and for managing the permissions and instructions that you provide.

Nothing in these Terms excludes rights or remedies that cannot lawfully be limited.

## 2. Independent project

OpenCode Mobile is an independent, community-built project.

It is not developed, operated, endorsed, or officially supported by the OpenCode project or its maintainers.

References to OpenCode identify the software ecosystem with which the Application is designed to work. All third-party names and trademarks remain the property of their respective owners.

The Application is provided independently from the OpenCode server, AI model providers, plugin developers, and other third-party software vendors.

## 3. Open-source license

### 3.1. Applicable license

OpenCode Mobile is open-source software distributed under the Apache License, Version 2.0, except for components that identify a different applicable license.

The complete license is available at:

https://github.com/alvarolorentedev/opencode-mobile/blob/main/LICENSE

The Apache 2.0 license governs your rights to use, reproduce, modify, distribute, and create derivative works of the covered software.

### 3.2. Relationship between license and Terms

These Terms address the official Application distribution, associated services, usage responsibilities, legal notices, and allocation of risks.

They do not replace, revoke, or restrict rights granted by the Apache 2.0 license.

If these Terms conflict with the applicable open-source license regarding the use, modification, or redistribution of licensed code, the open-source license controls those rights.

### 3.3. Third-party components

The Application may include software, libraries, or dependencies distributed under other open-source licenses.

Those components remain subject to their respective license conditions and notices.

## 4. Description of the Application

OpenCode Mobile is a client that connects to an OpenCode server selected by the user.

Depending on the connected server, App version, and configuration, the Application may allow you to:

- Manage projects, sessions, worktrees, and conversations;
- Send instructions to coding assistants and AI agents;
- Review generated responses, file changes, and terminal output;
- Approve or reject tool permissions;
- Execute supported commands and workflows;
- Browse, create, edit, or delete files;
- Interact with server-side terminals;
- Configure supported models, tools, and integrations;
- Use speech input, speech output, and other device capabilities;
- Receive local notifications about supported server events.

The availability of these features may depend on the server version, installed integrations, device capabilities, operating system, and selected connection method.

The Application is a client interface, not a substitute for the underlying OpenCode server.

Unless otherwise expressly stated, the Application does not host your development environment, execute server-side commands on its own infrastructure, or independently maintain your code repositories.

## 5. Connections to user-selected servers

### 5.1. Server selection

You determine which OpenCode server the Application connects to.

The server may operate on your own computer, a machine administered by your organization, or another system that you are authorized to access.

### 5.2. Responsibility for connected infrastructure

You or the relevant system operator are responsible for:

- Installing and maintaining the OpenCode server;
- Applying operating-system and software security updates;
- Configuring appropriate authentication and authorization;
- Protecting server credentials, API keys, and access tokens;
- Managing network exposure, proxies, tunnels, and firewall rules;
- Controlling file-system and process permissions;
- Managing plugins, tools, dependencies, and server configuration;
- Maintaining suitable backups, monitoring, and recovery procedures.

Connecting to a server through OpenCode Mobile does not transfer ownership, administration, or general security responsibility for that server to the Maintainer.

### 5.3. Secure connection configuration

You should connect through authenticated and appropriately encrypted network connections.

You are responsible for evaluating the security of any VPN, reverse proxy, tunnel, authentication provider, custom certificate authority, or other connection infrastructure you configure.

You should not expose an unauthenticated OpenCode server directly to the public internet.

### 5.4. Third-party or shared servers

If you connect to a server owned or administered by another person or organization, that operator may be able to access, retain, inspect, or process your activity and workspace data.

You are responsible for confirming that you are authorized to use the server and that its configuration and policies are suitable for your intended use.

The Maintainer is not responsible for the independent operation or security of servers administered by third parties, except to the extent a loss is attributable to the Maintainer's own legally actionable conduct.

## 6. AI agents and automated execution

### 6.1. Capabilities and risks

Through a connected OpenCode server, the Application may enable AI agents, scripts, plugins, tools, and automated workflows to perform operations.

Depending on configuration, such operations may:

- Read, edit, move, or delete files;
- Execute shell commands;
- Install or remove software;
- Modify repositories and configurations;
- Access network services and external APIs;
- Read or transmit confidential information;
- Use authentication credentials available in the execution environment;
- Consume paid API services or computing resources;
- Interact with production systems.

AI-generated instructions and actions may be incorrect, insecure, unpredictable, or unsuitable for your environment.

### 6.2. User oversight

You are responsible for selecting your agents, configuring permissions, issuing instructions, and reviewing actions where appropriate.

You should use least-privilege permissions, isolated environments, version control, and independent backups for operations with material consequences.

Enabling automatic approvals, unattended execution, or elevated permissions may increase the potential impact of incorrect or malicious agent behavior.

### 6.3. Permission interfaces

The Application may display approval prompts and permission controls exposed by the connected server.

These controls do not guarantee that every operation will be safe or that an approved action will have only its expected consequences.

The connected server, installed tools, and configured execution environment ultimately determine which operations can be performed.

### 6.4. Responsibility for execution

To the extent permitted by law, the Maintainer is not responsible for damage or disclosure resulting from user instructions, user-approved actions, server-side execution, or independently operated AI models and plugins, unless the damage is attributable to the Maintainer's breach of an applicable legal or contractual duty.

You remain responsible for reviewing, testing, and validating outputs before relying on them in security-sensitive, financial, operational, or production contexts.

## 7. Data ownership and processing

### 7.1. Your content

You retain whatever rights you have in the source code, prompts, files, documents, and other content that you access through the Application.

These Terms do not transfer ownership of your content to the Maintainer.

You must have the necessary rights or permissions to access and process third-party materials.

### 7.2. Workspace traffic

For ordinary direct connections, prompts, messages, project files, terminal output, and other workspace traffic are sent to the OpenCode server that you configure.

The Maintainer does not ordinarily receive or store that workspace traffic through an OpenCode Mobile-operated server.

Your chosen server, AI providers, networking providers, and plugins may process data according to their own functionality and terms.

### 7.3. Device storage and diagnostics

The Application may maintain connection settings, credentials, local diagnostic information, and other information required to provide supported functionality.

Local-first diagnostics, optional remote telemetry, voice functionality, and credential handling are described in the Privacy Policy.

You are responsible for protecting your device and for reviewing diagnostic information before exporting or sharing it.

### 7.4. Personal information

Personal information is processed as described in the OpenCode Mobile Privacy Policy:

https://getopencode.app/privacy-policy/

The Privacy Policy describes the applicable processing purposes, service providers, user controls, and data-protection rights.

These Terms do not replace that Policy or remove any rights granted by applicable data-protection law.

## 8. Device security and credentials

You are responsible for taking reasonable precautions to protect devices on which the Application is installed.

These precautions may include:

- Keeping the operating system updated;
- Using a device passcode or biometric authentication;
- Preventing unauthorized physical access;
- Protecting credentials, recovery codes, and connection profiles;
- Removing access when a device is lost, sold, or compromised;
- Using suitable safeguards on shared devices;
- Avoiding untrusted software and modified operating-system environments where they create unacceptable security risks.

Device-level security features do not guarantee that credentials cannot be extracted or misused.

If your device or credentials are compromised, you are responsible for taking appropriate action with the relevant server and authentication provider.

The Application is not a managed endpoint-protection or credential-recovery service.

## 9. Data loss and security incidents

### 9.1. User-managed data

The Application does not provide an independent backup, disaster-recovery, or data-loss-prevention service for repositories or files stored on your connected server.

You should maintain adequate backups and recovery procedures before granting write or execution permissions to remote tools.

### 9.2. Risks of remote operation

You acknowledge that remote development operations may lead to:

- Accidental deletion or modification of files;
- Incorrect execution of commands;
- Unauthorized disclosure of information;
- Credential compromise;
- Corrupted configurations or repositories;
- Service interruption;
- Damage caused by malicious or compromised software;
- Unintended changes to systems.

### 9.3. Allocation of responsibility

**To the fullest extent permitted by applicable law, the Maintainer is not responsible for data leaks, unauthorized access, data loss, or security incidents arising from user-controlled or independently operated servers, unsafe configurations, compromised user credentials, user-authorized actions, or third-party software, except to the extent caused by the Maintainer's own breach of applicable obligations.**

This provision does not exclude responsibility for vulnerabilities or failures legally attributable to the Application or its distribution.

### 9.4. Incident response

Where an incident affects a server outside the Maintainer's control, the relevant server operator is generally responsible for investigation, containment, recovery, and any required notifications concerning that system.

The Maintainer remains responsible for legal obligations arising from incidents involving the Application or personal information processed under its responsibility.

## 10. Optional OpenCode Cloud Link integration

OpenCode Mobile can connect to compatible OpenCode servers without using OpenCode Cloud Link.

OpenCode Cloud Link is a separate, optional commercial remote-connectivity service.

Its operation, subscriptions, pairing, tunneling, and service-exposure functionality are governed by separate Terms of Service:

https://opencodecloud.link/terms-and-conditions/

Using the Application alone does not create a Cloud Link subscription or require acceptance of the Cloud Link commercial agreement.

If you choose to activate Cloud Link, the Cloud Link Terms apply to that service in addition to these Application Terms.

In the event of a conflict, the Cloud Link Terms govern Cloud Link connectivity, subscriptions, and its managed infrastructure, while these Terms and the applicable open-source licenses continue to govern the mobile Application.

The independent open-source licensing of OpenCode Mobile is unaffected by purchasing, cancelling, or terminating Cloud Link.

## 11. Third-party software and services

The Application may interact with software and services supplied by other parties, including OpenCode, model providers, identity providers, code-hosting platforms, plugins, and MCP servers.

You are responsible for reviewing the permissions, charges, data-handling practices, and terms associated with integrations you choose to enable.

The Maintainer does not control independent third-party operations or guarantee their availability, security, output quality, or compatibility.

This provision does not exclude any responsibility that applicable law places on the Maintainer for its own selection, distribution, or integration of third-party components.

## 12. Acceptable use

You may use the Application for lawful purposes, including legitimate software development, administration, research, and authorized automation.

When using official distribution or support services, you must not:

- Access systems without authorization;
- Misuse credentials belonging to others;
- Conduct unlawful intrusions or attacks;
- Intentionally interfere with the Maintainer's infrastructure;
- Abuse support or community services;
- Use the Application to infringe another person's rights;
- Circumvent security protections for unlawful purposes.

These acceptable-use conditions do not withdraw rights granted by the Apache 2.0 license to use, study, modify, or redistribute the licensed software.

Any restriction on associated online services applies to those services, not to independently exercising open-source license rights.

## 13. Community contributions and support

OpenCode Mobile is a community-developed project.

You may report issues, propose features, or contribute through the project's public repository.

Contributions are governed by applicable repository contribution terms, licenses, and policies.

Public submissions may be visible to other users. Do not include passwords, API keys, private source code, or confidential information in public reports.

Support and feature development are provided according to available resources. No individual response time or guaranteed maintenance schedule is promised unless expressly agreed.

## 14. Updates and compatibility

The Application may receive improvements, security updates, bug fixes, and compatibility changes.

Supported functionality may evolve with the OpenCode ecosystem, operating systems, and external service interfaces.

We do not guarantee compatibility with every existing or future server, extension, plugin, or device.

Updates and changes to official distributions remain subject to any legally applicable conformity, security-update, and consumer-protection obligations.

Users who modify or build the open-source code independently are responsible for those modifications, subject to applicable law.

## 15. Warranties and disclaimers

The Apache 2.0 license contains its own warranty and liability provisions for software distributed under that license.

To the extent permitted by applicable law, and except for expressly assumed or non-excludable obligations, the Application is supplied without additional guarantees that it will:

- Operate without defects or interruptions;
- Prevent every security vulnerability or cyberattack;
- Produce accurate AI-generated results;
- Protect against unsafe remote-server configuration;
- Maintain compatibility with every third-party integration;
- Recover lost or damaged workspace data;
- Prevent all unwanted command execution.

Nothing in this section excludes mandatory statutory guarantees, product-safety responsibilities, consumer remedies, or other liabilities that cannot legally be excluded.

## 16. Limitation of liability

### 16.1. General principle

Responsibility for a loss depends on the cause of that loss, the parties' applicable duties, and the extent to which the conduct or failure is legally attributable to the Maintainer.

The Application's role as a client does not make the Maintainer the administrator of your selected server.

### 16.2. User-controlled risks

To the maximum extent permitted by law, the Maintainer is not liable for losses arising from:

- Vulnerabilities or compromises in independently operated servers;
- User-managed network configurations or exposed endpoints;
- Actions initiated or approved through the connected server;
- Third-party AI models, plugins, or integrations;
- Failures to maintain suitable backups;
- Unauthorized use of credentials not attributable to the Maintainer's conduct;
- Modifications to the Application made by unrelated third parties.

These exclusions apply only where the loss is not caused by a legally actionable failure of the Maintainer.

### 16.3. Business losses

For users acting in a business or professional capacity, indirect or consequential commercial losses, including lost profits and business opportunities, are excluded to the extent permitted by law, except where such exclusion would be unlawful.

### 16.4. Mandatory rights

Nothing in these Terms excludes or restricts liability for fraud, intentional misconduct, injury, mandatory product or consumer obligations, unlawful personal-data processing, or other matters for which applicable law prohibits exclusion or limitation.

## 17. Suspension and termination

You may stop using or uninstall the Application at any time.

Uninstalling it does not remove files, sessions, configurations, or other data from your OpenCode server.

You remain responsible for revoking server credentials or permissions when needed.

The Maintainer may restrict access to official online services, distribution channels under its control, or community facilities where reasonably necessary to address abuse, security threats, or legal requirements.

Such restrictions do not terminate rights already granted under the applicable open-source license, except according to that license's own terms.

Termination of a separate Cloud Link subscription is governed by the Cloud Link Terms and applicable store requirements.

## 18. Changes to these Terms

We may update these Terms to reflect changes in the Application, its associated services, or legal requirements.

Updated versions will be published with a revised effective date.

Where required by law, material changes will be notified in advance and users will receive any applicable rights to reject or terminate a contractual service.

Changes do not retroactively remove validly granted open-source rights or statutory protections.

## 19. Governing law and disputes

These Terms are governed by Spanish law, subject to mandatory rules that apply to users in other jurisdictions.

Consumers retain the protection of mandatory laws applicable to them and may use courts or dispute-resolution procedures available under applicable law.

No provision requires consumers to waive legally protected rights to seek remedies before competent courts or authorities.

The parties are encouraged to attempt an informal resolution before pursuing formal proceedings, without making that a condition of exercising mandatory legal rights.

## 20. General provisions

If a provision is invalid or unenforceable, the remaining provisions continue to apply where legally possible.

Failure to enforce a provision does not automatically waive the right to enforce it later.

These Terms govern the use of the official Application and related services, without superseding the Apache 2.0 license or mandatory legal requirements.

Any assignment of contractual obligations must comply with applicable law.

Translated versions may be provided, subject to mandatory local-language and consumer-protection requirements.

## 21. Legal information and contact

**Service Provider:** Alvaro Lorente  
**Project:** OpenCode Mobile  
**Website:** https://getopencode.app  
**Repository:** https://github.com/alvarolorentedev/opencode-mobile  
**Privacy Policy:** https://getopencode.app/privacy-policy/  
**Business/legal address:** [Insert required address]  
**Tax identification:** [Insert if legally required]  
**Legal contact email:** [Insert verified email]  
**Registration information:** [Insert if applicable]

Questions regarding the Application, these Terms, or legal rights may be directed to the published legal contact or the official support channels.

Security vulnerabilities should be reported privately through the project's designated security-reporting process.

---

**End of OpenCode Mobile Terms of Use**