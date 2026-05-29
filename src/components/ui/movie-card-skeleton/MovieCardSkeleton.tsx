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
        <div className="mcs__line mcs__shimmer" style={{ width: "75%", height: 17, marginBottom: 14 }} />

        <div className="mcs__row" style={{ marginBottom: 10 }}>
          <div className="mcs__pill mcs__shimmer" style={{ width: 52, height: 20 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 44, height: 20 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 36, height: 20 }} />
        </div>

        <div className="mcs__line mcs__shimmer" style={{ width: "100%", height: 12, marginBottom: 6 }} />
        <div className="mcs__line mcs__shimmer" style={{ width: "85%",  height: 12, marginBottom: 14 }} />

        <div className="mcs__row">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mcs__star mcs__shimmer" style={{ width: 14, height: 14 }} />
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
        <div className="mcs__row" style={{ marginBottom: 6 }}>
          <div className="mcs__pill mcs__shimmer" style={{ width: 36, height: 18 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 52, height: 18 }} />
          <div className="mcs__pill mcs__shimmer" style={{ width: 44, height: 18 }} />
        </div>
        <div className="mcs__line mcs__shimmer" style={{ width: "55%", height: 14, marginBottom: 6 }} />
        <div className="mcs__line mcs__shimmer" style={{ width: "80%", height: 12 }} />
      </div>

      <div className="mlrs__actions">
        <div className="mcs__line mcs__shimmer" style={{ width: 36, height: 14, marginBottom: 8 }} />
        <div className="mcs__row">
          <div className="mcs__btn mcs__shimmer" />
          <div className="mcs__btn mcs__shimmer" />
        </div>
      </div>
    </div>
  );
}
