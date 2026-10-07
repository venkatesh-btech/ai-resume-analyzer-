export default function ScoreCircle({ score, label = 'Match score', size = 'large' }) {
  const dimension = size === 'small' ? 'h-16 w-16' : 'h-36 w-36';
  const textSize = size === 'small' ? 'text-lg' : 'text-4xl';

  return (
    <div
      className={`score-ring ${dimension}`}
      style={{ '--score': `${Math.max(0, Math.min(100, score))}%` }}
      role="img"
      aria-label={`${label}: ${score}%`}
    >
      <div className="score-ring-inner">
        <span className={`${textSize} font-bold tracking-tight text-ink`}>{score}</span>
        <span className={size === 'small' ? 'text-[9px]' : 'text-xs'}>{label}</span>
      </div>
    </div>
  );
}
