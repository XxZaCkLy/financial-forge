import { payoffRoadmap } from "../utils/payoff";

const avalanchePlan = payoffRoadmap(debts, payment, "Avalanche");
const snowballPlan = payoffRoadmap(debts, payment, "Snowball");

<View style={{ marginTop: spacing.lg }}>
  <Text style={{ fontSize: 18, color: c.text, marginBottom: spacing.sm }}>
    Avalanche Plan Roadmap
  </Text>
  {avalanchePlan.steps.map((s, i) => (
    <Text key={i} style={{ color: c.muted }}>
      Month {s.month}: {s.debt} paid off (Remaining: ${Math.round(s.remaining).toLocaleString()})
    </Text>
  ))}

  <Text style={{ fontSize: 18, color: c.text, marginVertical: spacing.sm }}>
    Snowball Plan Roadmap
  </Text>
  {snowballPlan.steps.map((s, i) => (
    <Text key={i} style={{ color: c.muted }}>
      Month {s.month}: {s.debt} paid off (Remaining: ${Math.round(s.remaining).toLocaleString()})
    </Text>
  ))}
</View>
