export default function Recommendations() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 rounded-lg bg-accent text-accent-foreground border">
        <h3 className="font-medium mb-5">Recommendations</h3>
        <ul className="text-sm space-y-4">
          <li>
            *** Consider reducing entertainment spending by $30 to stay on
            budget
          </li>
          <li>{`** You're doing great with food spending - keep it up!`}</li>
          <li>
            * Transportation costs are trending up - review recent expenses
          </li>
        </ul>
      </div>
    </div>
  );
}
