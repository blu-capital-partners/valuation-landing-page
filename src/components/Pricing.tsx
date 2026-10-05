import {
  AFTER_DELIVERY_SURCHARGE_PCT,
  BASE_FEE_EUR,
  DELIVERY_OPTIONS,
  REVENUE_TIERS,
  afterDeliveryFee,
  formatEur,
} from '../shared/pricing'

const rangeLabel = (from: number, to: number | null) =>
  to === null ? `€${from}m and above` : from === 0 ? `Under €${to}m` : `€${from}m – €${to}m`

export default function Pricing() {
  return (
    <section id="pricing" className="section section--paper" aria-labelledby="pricing-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="pricing-title">One fixed fee, set by the size of your company</h2>
          <p>
            Every valuation starts at {formatEur(BASE_FEE_EUR)}. The fee rises with annual revenue, because larger
            companies need more analysis. Your quote shows the exact amount before you commit.
          </p>
        </div>

        {/* One column per way to pay: 50% upfront (best price), or 100% after delivery at +20%. */}
        <div className="fees">
          <table className="fees__table" aria-label="Valuation fee by annual revenue">
            <thead>
              <tr>
                <th scope="col">Annual revenue</th>
                <th scope="col" className="fees__best">
                  Pay 50% upfront <span className="best-price">Best price</span>
                </th>
                <th scope="col">Pay 100% after delivery (+{AFTER_DELIVERY_SURCHARGE_PCT}%)</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE_TIERS.map((tier) => (
                <tr key={tier.fromEurM}>
                  <th scope="row">{rangeLabel(tier.fromEurM, tier.toEurM)}</th>
                  <td className="fees__best">{formatEur(BASE_FEE_EUR + tier.addOnEur)}</td>
                  <td>{formatEur(afterDeliveryFee(BASE_FEE_EUR + tier.addOnEur))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">All fees exclude VAT. Faster delivery is an optional add-on.</p>
        </div>

        <div className="pricing__extra">
          <div className="delivery">
            <h3>Delivery speed</h3>
            <table className="delivery__table">
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">Report ready in</th>
                  <th scope="col">Extra cost</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_OPTIONS.map((o) => (
                  <tr key={o.id}>
                    <th scope="row">{o.label}</th>
                    <td>{o.turnaround}</td>
                    <td>{o.addOnEur ? `+${formatEur(o.addOnEur)}` : 'Included'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fine">Delivery time counts from the day we receive your complete financials.</p>
          </div>
          <div className="payment">
            <h3>Two ways to pay</h3>
            <dl className="payment__list">
              <div>
                <dt>
                  50% upfront, 50% on delivery <span className="best-price">Best price</span>
                </dt>
                <dd>
                  Pay half of the fee online by card when you sign, to start the valuation, and the rest after delivery,
                  before your review call with the banker.
                </dd>
              </div>
              <div>
                <dt>100% after delivery (+{AFTER_DELIVERY_SURCHARGE_PCT}%)</dt>
                <dd>
                  Nothing to pay upfront. Once the engagement letter is signed you get the secure upload link straight
                  away, and you pay the full fee after you receive the report.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
