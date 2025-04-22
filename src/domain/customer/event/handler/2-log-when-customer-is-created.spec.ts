import { CustomerCreatedEvent } from "../customer-created.event";
import { LogWhenCustomerIsCreated2 } from "./2-log-when-customer-is-created.handler";

describe("Log when customer is created (2)", () => {
  it("should log correct message", () => {
    const handler = new LogWhenCustomerIsCreated2();
    const event = new CustomerCreatedEvent(null);

    const logSpy = jest.spyOn(console, "log");

    handler.handle(event);

    expect(logSpy).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });
});
