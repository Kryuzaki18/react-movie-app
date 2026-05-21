import { useTheme } from "../../../context/ThemeContext";
import "./MovieCardSkeleton.css";

export function MovieCardSkeleton() {
  const { colors } = useTheme();

  return (
    <div
      className="mcs"
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="mcs__cover mcs__shimmer" />

      <div className="mcs__body">
        <div className="mcs__line mcs__shimmer" style={{ width: "75%", height: 14, marginBottom: 10 }} />

        <div className="mcs__row" style={{ marginBottom: 8 }}>
          <div className="mcs__pill mcs__shimmer" style={{ width: 52 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 44 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 36 }} />
        </div>

        <div className="mcs__line mcs__shimmer" style={{ width: "100%", height: 11, marginBottom: 6 }} />
        <div className="mcs__line mcs__shimmer" style={{ width: "85%", height: 11, marginBottom: 10 }} />

        <div className="mcs__row">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mcs__star mcs__shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MovieListRowSkeleton() {
  const { colors } = useTheme();

  return (
    <div
      className="mlrs"
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div className="mlrs__thumb mcs__shimmer" />

      <div className="mlrs__body">
        <div className="mcs__line mcs__shimmer" style={{ width: "55%", height: 14, marginBottom: 8 }} />
        <div className="mcs__row" style={{ marginBottom: 8 }}>
          <div className="mcs__pill mcs__shimmer" style={{ width: 36 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 52 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 44 }} />
        </div>
        <div className="mcs__line mcs__shimmer" style={{ width: "80%", height: 11 }} />
      </div>

      <div className="mlrs__actions">
        <div className="mcs__line mcs__shimmer" style={{ width: 32, height: 14, marginBottom: 8 }} />
        <div className="mcs__row">
          <div className="mcs__btn mcs__shimmer" />
          <div className="mcs__btn mcs__shimmer" />
        </div>
      </div>
    </div>
  );
}
