import { MatrixMonitorIcon, StopwatchIcon, TargetArrowIcon } from './badgeIcons'

const BADGES = [
  { Icon: StopwatchIcon, key: 'fast', title: 'Fast', sub: 'Quote in 60 seconds' },
  { Icon: TargetArrowIcon, key: 'accurate', title: 'Accurate', sub: 'Benchmarked on 1m+ transactions' },
  { Icon: MatrixMonitorIcon, key: 'digital', title: 'Fully digital', sub: 'Sign and pay online' },
]

export default function HeroBadges() {
  return (
    <ul className="badges">
      {BADGES.map(({ Icon, key, title, sub }) => (
        <li className={`badge badge--${key}`} key={key}>
          <span className="badge__icon">
            <Icon />
          </span>
          <span className="badge__text">
            <strong>{title}</strong>
            <span className="badge__sub">{sub}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
