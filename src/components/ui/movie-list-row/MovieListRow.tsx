import { Row, Col, Space, Tag, Typography, Button, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { memo } from 'react';
import { PlayCircleOutlined, InfoCircleOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import type { Movie } from '../../../models/movie';
import { useTheme } from '../../../context/ThemeContext';
import useResolvedGenres from '../../../hooks/useResolvedGenres';
import { useWatchlistQuery, useAddToWatchlistMutation, useRemoveFromWatchlistMutation } from '../../../api/useWatchlistQuery';
import './MovieListRow.css';

const { Text } = Typography;

const TOOLTIP_TRIGGER: TooltipProps['trigger'] = window.matchMedia('(hover: none) and (pointer: coarse)').matches
  ? []
  : ['hover'];

interface MovieListRowProps {
  movie:    Movie;
  onPlay:   (movie: Movie) => void;
  onDetail: (movie: Movie) => void;
}

function MovieListRowInner({ movie, onPlay, onDetail }: MovieListRowProps) {
  const { colors } = useTheme();
  const resolvedGenres = useResolvedGenres(movie.genre);

  const { data: watchlistItems = [] } = useWatchlistQuery();
  const addMutation    = useAddToWatchlistMutation();
  const removeMutation = useRemoveFromWatchlistMutation();

  const movieId     = String(movie.id);
  const inWatchlist = watchlistItems.some((w) => w.movieId === movieId);
  const isPending   = addMutation.isPending || removeMutation.isPending;

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeMutation.mutate(movieId);
    } else {
      addMutation.mutate(movie);
    }
  };

  return (
    <div
      className="movie-list-row"
      style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="movie-list-row__thumb"
      />
      <div className="movie-list-row__body">
        <Row justify="space-between" align="top" wrap={false}>
          <Col flex="auto" style={{ minWidth: 0, paddingRight: 16 }}>
            <Text strong className="movie-list-row__title">
              {movie.title}
            </Text>
            <Space size={8} className="movie-list-row__meta" wrap>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                {movie.year}
              </Text>
              {movie.duration && movie.duration !== 'N/A' && (
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                  {movie.duration}
                </Text>
              )}
              {resolvedGenres.slice(0, 3).map((rg) => (
                <Tag
                  key={rg.key}
                  color={rg.color ?? 'default'}
                  style={{ margin: 0, fontSize: 11 }}
                >
                  {rg.label}
                </Tag>
              ))}
            </Space>
            <Text
              className="movie-list-row__desc"
              style={{ color: colors.textMuted }}
            >
              {movie.description}
            </Text>
          </Col>
          <Col className="movie-list-row__actions">
            <Space direction="vertical" size={6} align="end">
              <Text className="movie-list-row__rating">★ {movie.rating}</Text>
              <Space size={12}>
                <Tooltip title="Play" trigger={TOOLTIP_TRIGGER}>
                  <Button
                    size="middle"
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() => onPlay(movie)}
                    aria-label={`Play ${movie.title}`}
                    style={{ background: '#e50914', borderColor: '#e50914' }}
                  />
                </Tooltip>
                <Tooltip title="More Info" trigger={TOOLTIP_TRIGGER}>
                  <Button
                    size="middle"
                    icon={<InfoCircleOutlined />}
                    onClick={() => onDetail(movie)}
                    aria-label={`More info about ${movie.title}`}
                  />
                </Tooltip>
                <Tooltip title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'} trigger={TOOLTIP_TRIGGER}>
                  <Button
                    size="middle"
                    loading={isPending}
                    icon={inWatchlist
                      ? <HeartFilled style={{ color: '#e50914' }} />
                      : <HeartOutlined />}
                    onClick={handleWatchlistToggle}
                    aria-label={inWatchlist
                      ? `Remove ${movie.title} from watchlist`
                      : `Add ${movie.title} to watchlist`}
                  />
                </Tooltip>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default memo(MovieListRowInner);
