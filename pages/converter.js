import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Animated, StyleSheet, Text, View, Button } from "react-native";

//Adding currencies, setting the base as USD and the default "convert to" as EUR
class CONVERTER extends Component {
  state = {
    currencies: ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"],
    base: "USD",
    amount: "",
    convertTo: "EUR",
    result: "",
    date: ""
  };

  //Setting values to exchange
  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  //Setting values to exchange
  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
      },
      this.calculate
    );
  };

  // Retrieving the currency exchange data using the input introduced by the user from the API
  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date
          });
        });
    }
  };

  //Letting the user to swap between currencies
  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };

  //Showing data, applying styles
  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>EXCHANGE CURRENCY</Text>
        <h2>
          {amount} {base} is equivalent to
              </h2>
        <h2>
          {amount === ""
            ? "0"
            : result === null
              ? "Calculating..."
              : result}{" "}
          {convertTo}
        </h2>
        <div className="row">
          <div className="col-lg-10">
            <form className="form-inline mb-4">
              <input
                type="number"
                value={amount}
                onChange={this.handleInput}
                className="form-control form-control-lg mx-3"
              />
              <select
                name="base"
                value={base}
                onChange={this.handleSelect}
                className="form-control form-control-lg"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </form>

            <form className="form-inline mb-4">
              <input
                disabled={true}
                value={
                  amount === ""
                    ? "0"
                    : result === null
                      ? "Calculating..."
                      : result
                }
                className="form-control form-control-lg mx-3"
              />
              <select
                name="convertTo"
                value={convertTo}
                onChange={this.handleSelect}
                className="form-control form-control-lg"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.handleSwap} className="swap">SWAP</button>
            </form>


          </div>

        </div>
      </View>
    );
  }
}

//  Stylesheet for the converter Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#02e8d9",
  },
  title: {
    color: "#61686b",
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 45,
    paddingBottom: 15,
  },
  subtitle: {
    color: "grey",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle2: {
    color: "grey",
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    fontWeight: "bold",
  },
  rowUser: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "60%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  user: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 25,
  },
  fadingContainer: {
    width: "70%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
    marginTop: 20,
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
  },
  fadingContainerdeveloper: {
    width: "50%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: "thin",
    borderTopColor: "grey",
    paddingBottom: 5,
  },
  listRowHeader: {
    flex: 1,
    color: "grey",
  },
  listRow: {
    flex: 1,
  }
});

export default CONVERTER;
