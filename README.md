# Zabbix NOC Action Calculator 🚀

A dynamic risk scoring and smart prioritization system for Zabbix Monitoring. This project uses a custom Zabbix Webhook (Media Type) written in JavaScript to automatically calculate the severity of an incident and define the exact action required by the NOC (Network Operations Center) team.

## 🎯 The Problem It Solves
Alert fatigue is a major issue for NOC teams. Not every alert requires a midnight phone call, and not every server has the same business impact. This system intelligently calculates a dynamic `RiskScore` and assigns a specific workflow (`NOC Action`) to Zabbix events, telling the team exactly what to do.

## ⚙️ How It Works

The system calculates the risk based on two primary factors:
1. **`Host Score`**: A tag placed on Hosts representing the business criticality of the server.
2. **`IncidentScore`**: A tag placed on Triggers (usually in Templates) representing the technical severity of the issue.

When an event occurs, the Webhook triggers and executes the JavaScript logic. It parses the Event Tags and calculates the Risk Score:

$$RiskScore = HostScore * IncidentScore$$

Based on the calculated $$RiskScore$$, the script determines the priority and the required NOC action, then injects these back into the Zabbix Event as new tags (`RiskScore` and `Noc Action`).

### 📊 Priority Matrix & NOC Actions

| Risk Score ($$RiskScore$$) | Priority | NOC Action Workflow |
| :--- | :--- | :--- |
| **>= 25** | P1 (Critical) | Announce ➔ Call ➔ Ticket |
| **18 to 24** | P2 (High) | Announce ➔ Ticket ➔ Call |
| **7 to 17** | P3 (Medium) | Announce ➔ Ticket |
| **< 7** | P4 (Low) | Announce |

## 🚀 Installation & Setup

1. **Tagging Configuration**:
   * Add a tag named `Host Score` (e.g., 1 to 5) to your Zabbix Hosts.
   * Add a tag named `IncidentScore` (e.g., 1 to 10) to your Zabbix Triggers/Templates.

2. **Create the Media Type**:
   * Go to **Administration -> Media types** in Zabbix.
   * Click **Create media type**.
   * Set **Name** to `NOC Action Calculator`.
   * Set **Type** to `Webhook`.
   * Add the required parameters (e.g., `EventTags`).
   * Paste the provided JavaScript code into the **Script** section.
<img width="725" height="658" alt="{0EE6667C-F559-492D-8315-AFAD6E555860}" src="https://github.com/user-attachments/assets/3031e07c-e2a7-4736-835e-695cd8d9f329" />

3. **Configure Trigger Actions**:
   * Go to **Configuration -> Actions -> Trigger actions**.
   * Create an action that triggers upon problem generation.
   * Set the operation to send a message using the `NOC Action Calculator` media type.


## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## 📝 License
This project is [MIT](LICENSE) licensed.
