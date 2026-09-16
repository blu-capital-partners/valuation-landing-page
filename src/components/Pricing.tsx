import { BASE_FEE_EUR, DELIVERY_OPTIONS, REVENUE_TIERS, formatEur } from '../shared/pricing'

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

        <div className="ruler" role="table" aria-label="Valuation fee by annual revenue">
          <div role="rowgroup" className="ruler__rows">
            {REVENUE_TIERS.map((tier) => (
              <div role="row" className="ruler__seg" key={tier.fromEurM}>
                <span role="cell" className="ruler__fee">
                  {formatEur(BASE_FEE_EUR + tier.addOnEur)}
                </span>
                <span role="cell" className="ruler__addon">
                  {tier.addOnEur ? `${formatEur(BASE_FEE_EUR)} + ${formatEur(tier.addOnEur)}` : 'Base fee'}
                </span>
                <span className="ruler__bar" aria-hidden="true" />
                <span role="rowheader" className="ruler__range">
                  {rangeLabel(tier.fromEurM, tier.toEurM)}
                </span>
              </div>
            ))}
          </div>
          <p className="ruler__axis">Annual revenue</p>
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
            <h3>Payment in two parts</h3>
            <div className="split" aria-hidden="true">
              <span>50%</span>
              <span>50%</span>
            </div>
            <dl className="payment__list">
              <div>
                <dt>When you sign</dt>
                <dd>Pay half of the fee online by card to start the valuation.</dd>
              </div>
              <div>
                <dt>When you receive the report</dt>
                <dd>Pay the rest after delivery, before your review call with the banker.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
