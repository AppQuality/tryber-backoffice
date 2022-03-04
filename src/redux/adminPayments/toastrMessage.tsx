import { Text } from "@appquality/appquality-design-system";

export function toastrMessage(processingPayments: ProcessableRequest[]) {
  const succesful = processingPayments.filter(
    (p) => p.status === "success"
  ).length;
  const errors = processingPayments.filter((p) => p.status === "error").length;
  const pending = processingPayments.filter(
    (p) => p.status === "pending"
  ).length;
  return (
    <div>
      {succesful && <Text>{succesful} requests were payed succesfully.</Text>}
      {errors && (
        <Text>
          {errors} request were not payed because of an error and you'll find
          them in the failed payments tab.
        </Text>
      )}
      {pending && (
        <Text>
          {pending} payment requests were canceled and you'll still find them in
          the pending payments tab
        </Text>
      )}
    </div>
  );
}
