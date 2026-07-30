"use client";

import { useMemo, useState } from "react";

export default function PositionSizingPage() {
  const [account, setAccount] = useState(50000);
  const [risk, setRisk] = useState(1);

  const [instrument, setInstrument] = useState("gold");

  const [pointValue, setPointValue] = useState(10);

  const [entry, setEntry] = useState(4010);
  const [sl, setSl] = useState(4015);

  const riskAmount = useMemo(() => {
    return (account * risk) / 100;
  }, [account, risk]);

  const stopDistance = useMemo(() => {
    return Math.abs(entry - sl);
  }, [entry, sl]);

  const positionSize = useMemo(() => {
    if (!stopDistance || !pointValue) return 0;

    return Math.floor(riskAmount / (stopDistance * pointValue));
  }, [riskAmount, stopDistance, pointValue]);

  const handleInstrument = (value: string) => {
    setInstrument(value);

    if (value === "gold") {
      setPointValue(10);
    }

    if (value === "oil") {
      setPointValue(100);
    }
  };

  return (
    <div className="container py-5">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">
            Position Sizing Calculator
          </h3>
        </div>

        <div className="card-body">

          <div className="row">
            <div className="col-md-6">

              <div className="mb-3">
                <label className="form-label">
                  Account Size ($)
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={account}
                  onChange={(e) => setAccount(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Risk Per Trade (%)
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={risk}
                  onChange={(e) => setRisk(Number(e.target.value))}
                />
              </div>

            </div>

            <div className="col-md-6">

              <h5>
                Instrument
              </h5>

              <select
                className="form-select"
                value={instrument}
                onChange={(e) => handleInstrument(e.target.value)}
              >
                <option value="gold">
                  Gold Micro
                </option>

                <option value="oil">
                  US Oil Micro
                </option>

                <option value="custom">
                  Custom
                </option>

              </select>

              <div className="mt-3">

                <label className="form-label">
                  Point Value ($)
                </label>

                <input
                  className="form-control"
                  type="number"
                  value={pointValue}
                  onChange={(e) =>
                    setPointValue(Number(e.target.value))
                  }
                />

              </div>

            </div>

          </div>

          <hr />

          <h5>
            Trade Setup
          </h5>

          <div className="row">

            <div className="col-md-6">

              <label className="form-label">
                Entry Price
              </label>

              <input
                className="form-control"
                type="number"
                value={entry}
                onChange={(e) => setEntry(Number(e.target.value))}
              />

            </div>

            <div className="col-md-6">

              <label className="form-label">
                Stop Loss
              </label>

              <input
                className="form-control"
                type="number"
                value={sl}
                onChange={(e) => setSl(Number(e.target.value))}
              />

            </div>

          </div>

          <hr />

          <div className="row text-center">

            <div className="col-md-4">

              <div className="card bg-light">

                <div className="card-body">

                  <h6>Risk Amount</h6>

                  <h3 className="text-danger">
                    ${riskAmount.toFixed(2)}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-light">

                <div className="card-body">

                  <h6>Stop Distance</h6>

                  <h3>
                    {stopDistance.toFixed(2)}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-success text-white">

                <div className="card-body">

                  <h6>Position Size</h6>

                  <h2>
                    {positionSize} Contracts
                  </h2>

                </div>

              </div>

            </div>

          </div>

          <hr />

          <div className="alert alert-info">

            <strong>Formula</strong>

            <br />

            Position Size =
            Risk Amount ÷
            (Stop Distance × Point Value)

            <br /><br />

            {riskAmount.toFixed(2)} ÷
            ({stopDistance.toFixed(2)} × {pointValue})
            =
            <strong> {positionSize} Contracts</strong>

          </div>

        </div>

      </div>

    </div>
  );
}