import { CustomerCreatedEvent } from "../customer-created.event";
import { LogWhenCustomerIsCreated1 } from "./1-log-when-customer-is-created.handler";

describe("Log when customer is created (1)", () => {
  it("should log correct message", () => {
    const handler = new LogWhenCustomerIsCreated1();
    const event = new CustomerCreatedEvent(null);

    const logSpy = jest.spyOn(console, "log");

    handler.handle(event);

    expect(logSpy).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
  });
});
