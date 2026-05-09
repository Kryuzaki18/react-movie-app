import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Slider, Button, Tag, Space, Rate, Spin, Result } from 'antd';
import {
  PlayCircleOutlined, PauseCircleOutlined, ExpandOutlined,
  SoundOutlined, StepForwardOutlined, StepBackwardOutlined,
  ArrowLeftOutlined, PlayCircleFilled,
} from '@ant-design/icons';
import { useMovieDetailQuery } from '../../api/useMoviesQuery';
import { GENRE_COLORS } from '../../constants/genres';
import { useTheme } from '../../context/ThemeContext';
import './Player.css';

const { Title, Text, Paragraph } = Typography;

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const { colors, isDark } = useTheme();

  const movieId = id ? parseInt(id, 10) : null;
  const { data: movie, isLoading, isError } = useMovieDetailQuery(
    Number.isFinite(movieId) ? movieId : null
  );

  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume,   setVolume]   = useState(80);
  const [muted,    setMuted]    = useState(false);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="player-page player-page--loading" style={{ background: '#000' }}>
        <Spin size="large" />
      </div>
    );
  }

  // ── Error / not found ─────────────────────────────────────────────────────
  if (isError || !movie) {
    return (
      <div className="player-page player-page--error" style={{ background: colors.bgBase }}>
        <Result
          status="404"
          title="Movie not found"
          subTitle="Lorem ipsum dolor sit amet — this movie doesn't exist."
          extra={
            <Link to="/">
              <Button type="primary" style={{ background: '#e50914', borderColor: '#e50914' }}>
                Back to Home
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const elapsedMinutes = Math.floor((progress / 100) * parseInt(movie.duration, 10) || 0);

  return (
    <div className="player-page" style={{ background: '#000' }}>
      {/* ── Video area ── */}
      <div
        className="player-page__video"
        onClick={() => setPlaying((p) => !p)}
      >
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="player-page__backdrop"
          style={{ opacity: playing ? 0.25 : 0.65 }}
        />

        {/* Gradient vignette */}
        <div className="player-page__vignette" />

        {/* Top bar — back button + title */}
        <div className="player-page__topbar">
          <Link to="/" className="player-page__back-link">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              className="player-page__back-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Back
            </Button>
          </Link>
          <Space align="center" size={8}>
            <PlayCircleFilled style={{ color: '#e50914', fontSize: 20 }} />
            <Text className="player-page__brand">
              Lorem<span style={{ color: '#e50914' }}>Flix</span>
            </Text>
          </Space>
        </div>

        {/* Centre play/pause */}
        <div className="player-page__overlay">
          {!playing ? (
            <div className="player-page__play-wrap">
              <PlayCircleOutlined className="player-page__play-icon" />
              <Text className="player-page__play-hint">Click to play</Text>
            </div>
          ) : (
            <PauseCircleOutlined className="player-page__pause-icon" />
          )}
        </div>

        {/* Bottom title overlay */}
        <div className="player-page__title-overlay">
          <Space size={6} wrap>
            {movie.genre.map((g) => (
              <Tag key={g} color={GENRE_COLORS[g] || 'default'} style={{ fontSize: 11 }}>{g}</Tag>
            ))}
          </Space>
          <Title level={2} className="player-page__title">{movie.title}</Title>
          <Space size={12}>
            <Rate disabled allowHalf defaultValue={movie.rating / 2} style={{ fontSize: 13, color: '#fadb14' }} />
            <Text style={{ color: '#fadb14', fontWeight: 700, fontSize: 13 }}>{movie.rating}/10</Text>
            <Text style={{ color: '#ccc', fontSize: 13 }}>{movie.year}</Text>
            <Text style={{ color: '#ccc', fontSize: 13 }}>{movie.duration}</Text>
          </Space>
        </div>
      </div>

      {/* ── Controls bar ── */}
      <div
        className="player-page__controls"
        style={{ background: isDark ? '#0d0d0d' : '#111' }}
      >
        {/* Progress slider */}
        <Slider
          value={progress}
          onChange={setProgress}
          tooltip={{ formatter: (v) => `${v}%` }}
          styles={{ track: { background: '#e50914' }, handle: { borderColor: '#e50914' } }}
          className="player-page__progress"
        />

        {/* Controls row */}
        <div className="player-page__controls-row">
          {/* Left — playback */}
          <Space size={4} align="center">
            <Button type="text" icon={<StepBackwardOutlined />} className="player-page__btn-nav" />
            <Button
              type="text"
              icon={
                playing
                  ? <PauseCircleOutlined style={{ fontSize: 32 }} />
                  : <PlayCircleOutlined  style={{ fontSize: 32 }} />
              }
              onClick={() => setPlaying((p) => !p)}
              className="player-page__btn-playpause"
            />
            <Button type="text" icon={<StepForwardOutlined />} className="player-page__btn-nav" />

            {/* Time */}
            <Text className="player-page__time">
              {elapsedMinutes}m / {movie.duration}
            </Text>
          </Space>

          {/* Right — volume + fullscreen */}
          <Space size={8} align="center">
            <Button
              type="text"
              icon={<SoundOutlined />}
              className={`player-page__btn-mute ${muted ? 'player-page__btn-mute--active' : ''}`}
              onClick={() => setMuted((m) => !m)}
            />
            <Slider
              value={muted ? 0 : volume}
              onChange={(v) => { setVolume(v); setMuted(false); }}
              className="player-page__volume"
              styles={{ track: { background: '#e50914' }, handle: { borderColor: '#e50914' } }}
            />
            <Button
              type="text"
              icon={<ExpandOutlined />}
              className="player-page__btn-nav"
              title="Fullscreen (demo)"
            />
          </Space>
        </div>
      </div>

      {/* ── Movie info panel ── */}
      <div
        className="player-page__info"
        style={{ background: colors.bgBase, borderTop: `1px solid ${isDark ? '#1a1a2e' : '#e0e0e8'}` }}
      >
        <div className="player-page__info-inner">
          <div className="player-page__info-main">
            <Title level={4} style={{ margin: '0 0 8px', color: colors.textPrimary }}>
              {movie.title}
            </Title>
            <Space size={8} wrap style={{ marginBottom: 12 }}>
              {movie.genre.map((g) => (
                <Tag key={g} color={GENRE_COLORS[g] || 'default'}>{g}</Tag>
              ))}
              {movie.newRelease && <Tag color="gold">New Release</Tag>}
              {movie.trending   && <Tag color="red">Trending</Tag>}
            </Space>
            <Paragraph style={{ color: colors.textSecondary, lineHeight: 1.7, margin: 0 }}>
              {movie.description}
            </Paragraph>
          </div>

          <div className="player-page__info-meta">
            <div className="player-page__meta-item">
              <Text className="player-page__meta-label" style={{ color: colors.textMuted }}>Year</Text>
              <Text strong style={{ color: colors.textPrimary }}>{movie.year}</Text>
            </div>
            <div className="player-page__meta-item">
              <Text className="player-page__meta-label" style={{ color: colors.textMuted }}>Duration</Text>
              <Text strong style={{ color: colors.textPrimary }}>{movie.duration}</Text>
            </div>
            <div className="player-page__meta-item">
              <Text className="player-page__meta-label" style={{ color: colors.textMuted }}>Rating</Text>
              <Text strong style={{ color: '#fadb14' }}>★ {movie.rating}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
