function buildChartPoints({
  data,
  width,
  height,
  paddingX,
  paddingTop,
  paddingBottom,
  minValue,
  maxValue,
}) {
  const graphHeight = height - paddingTop - paddingBottom;
  const segments = Math.max(data.length - 1, 1);

  return data.map((point, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / segments;
    const y =
      paddingTop + graphHeight - ((point.value - minValue) / (maxValue - minValue)) * graphHeight;

    return { ...point, x, y };
  });
}

function buildChartPath(points) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

function buildAttendanceGradient(items) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return 'conic-gradient(#dfe6f5 0% 100%)';
  }

  let start = 0;
  const stops = items.map((item) => {
    const percentage = (item.value / total) * 100;
    const end = start + percentage;
    const stop = `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    start = end;
    return stop;
  });

  return `conic-gradient(${stops.join(', ')})`;
}

export function AnalyticsLineChart({
  ariaLabel,
  data,
  yTicks,
  minValue,
  maxValue,
  width = 760,
  height = 300,
  paddingX = 56,
  paddingTop = 28,
  paddingBottom = 42,
  showVerticalGuides = false,
}) {
  const points = buildChartPoints({
    data,
    width,
    height,
    paddingX,
    paddingTop,
    paddingBottom,
    minValue,
    maxValue,
  });
  const graphHeight = height - paddingTop - paddingBottom;
  const path = buildChartPath(points);

  return (
    <div className="analytics-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        {yTicks.map((tick) => {
          const y =
            paddingTop + graphHeight - ((tick - minValue) / (maxValue - minValue)) * graphHeight;

          return (
            <g key={tick}>
              <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} className="analytics-chart-grid" />
              <text x={paddingX - 10} y={y + 5} textAnchor="end" className="analytics-chart-label">
                {tick}
              </text>
            </g>
          );
        })}

        {showVerticalGuides
          ? points.map((point) => (
              <line
                key={`${point.label || point.month}-guide`}
                x1={point.x}
                y1={paddingTop}
                x2={point.x}
                y2={height - paddingBottom}
                className="analytics-chart-grid"
              />
            ))
          : null}

        <path d={path} className="analytics-chart-line" />

        {points.map((point) => (
          <g key={point.label || point.month}>
            <circle cx={point.x} cy={point.y} r="7" className="analytics-chart-point" />
            <text
              x={point.x}
              y={height - 12}
              textAnchor="middle"
              className="analytics-chart-label analytics-chart-label-month"
            >
              {point.label || point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function AttendanceBreakdownCard({
  items,
  title = "Today's Attendance",
  description = 'Current status breakdown',
}) {
  const gradient = buildAttendanceGradient(items);

  return (
    <article className="analytics-card analytics-card-side">
      <div className="analytics-card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="attendance-overview">
        <div className="attendance-ring" style={{ background: gradient }} aria-hidden="true">
          <div className="attendance-ring-hole" />
        </div>

        <div className="attendance-legend">
          {items.map((item) => (
            <div key={item.label} className="attendance-legend-row">
              <span className="attendance-legend-label">
                <i style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
