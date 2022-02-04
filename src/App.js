import React from "react";
import { useEffect, useState } from "react";
import { loadVGSCollect } from "@vgs/collect-js";

import "./style.css";

const css = {
  fontFamily: '"Helvetica Neue", Helvetica',
  boxSizing: "border-box",
  lineHeight: "1.5em",
  fontSize: "14px",
  fontWeight: "200",
  border: "none",
  color: "#31325F",
  width: "100%",
  height: "100%",
  "&::placeholder": {
    color: "#CFD7E0"
  }
};

const App = () => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState("");

  useEffect(() => {
    const loadForm = async () => {
      const vgs_collect = await loadVGSCollect({
        vaultId: "tntq4dwvhri",
        environment: "sandbox",
        version: "2.4.0"
      }).catch(e => {
        console.log(e);
      });
      initForm(vgs_collect);
    };
    loadForm();
  }, []);

  const initForm = vgs_collect => {
    const form = vgs_collect.init(state => console.log(state));
    form.field("#card-name", {
      type: "text",
      name: "card_holder",
      placeholder: "Card holder",
      validations: ["required"],
      autoComplete: "cc-name",
      css
    });
    form.field("#card-number", {
      type: "card-number",
      name: "card_number",
      successColor: "#4F8A10",
      errorColor: "#D8000C",
      placeholder: "Card number",
      showCardIcon: true,
      validations: ["required", "validCardNumber"],
      autoComplete: "cc-number",
      css
    });
    form.field("#card-cvc", {
      type: "card-security-code",
      name: "card_cvc",
      successColor: "#4F8A10",
      errorColor: "#D8000C",
      placeholder: "CVC",
      maxLength: 3,
      validations: ["required", "validCardSecurityCode"],
      css
    });
    form.field("#card-expiry", {
      type: "card-expiration-date",
      name: "card_exp",
      successColor: "#4F8A10",
      errorColor: "#D8000C",
      placeholder: "MM / YY",
      validations: ["required", "validCardExpirationDate"],
      autoComplete: "cc-exp",
      css
    });
    setForm(form);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    form.submit("/post", {}, (status, data) => {
      setResponse(JSON.stringify(data, null, 4));
    });
  };

  return (
    <>
      <form id="collect-form">
        <div className="group">
          <label>
            <span>Card number</span>
            <div id="card-number" className="field" />
          </label>
          <label>
            <span>Expiry date</span>
            <div id="card-expiry" className="field" />
          </label>
          <label>
            <span>CVC</span>
            <div id="card-cvc" className="field" />
          </label>
          <label>
            <span>Cardholder name</span>
            <div id="card-name" className="field" />
          </label>
        </div>
        <button type="submit" onClick={handleFormSubmit}>
          Submit payment
        </button>
      </form>
      <div className="response-container">
        <pre id="response">{response}</pre>
      </div>
    </>
  );
};

export default App;
