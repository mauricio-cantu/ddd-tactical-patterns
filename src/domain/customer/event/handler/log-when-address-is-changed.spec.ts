import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import { AddressChangedEvent } from "../address-changed.event";
import { LogWhenAddressIsChanged } from "./log-when-address-is-changed.handler";

describe("Log when address is changed", () => {
  it("should log correct message", () => {
    const handler = new LogWhenAddressIsChanged();
    const customer = new Customer("123", "John Test");
    const address = new Address("Test", 999, "99999-99", "Test City");
    customer.changeAddress(address);

    const event = new AddressChangedEvent(customer);

    const logSpy = jest.spyOn(console, "log");

    handler.handle(event);

    expect(logSpy).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado para: ${customer.Address.toString()}`
    );
  });
});
