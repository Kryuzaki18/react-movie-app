import { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Empty,
  Space,
  Segmented,
  Button,
  Skeleton,
  Input,
  Select,
} from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import MovieCard from "../../components/ui/movie-card/MovieCard";
import MovieListRow from "../../components/ui/movie-list-row/MovieListRow";
import { useWatchlistQuery, useRemoveFromWatchlistMutation } from "../../api/useWatchlistQuery";
import { watchlistItemToMovie } from "../../api/watchlistApi";
import { usePlayerStore } from "../../store/playerStore";
import { useTheme } from "../../context/ThemeContext";
import "./Watchlist.css";

const { Title, Text } = Typography;

export default function Watchlist() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { playMovie, openDetail } = usePlayerStore();

  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [search, setSearch]   = useState("");
  const [sortBy, setSortBy]   = useState<"newest" | "oldest" | "az" | "rating">("newest");

  const { data: watchlistItems = [], isLoading } = useWatchlistQuery();
  const removeMutation = useRemoveFromWatchlistMutation();

  const filtered = watchlistItems
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      if (sortBy === "oldest") return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      if (sortBy === "az")     return a.title.localeCompare(b.title);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const skeletonCols = Array.from({ length: 8 });

  return (
    <div className="watchlist">
      <div className="watchlist__header">
        <div>
          <Title level={2} style={{ marginBottom: 4, marginTop: 0 }}>
            My Watchlist
          </Title>
          <Text style={{ color: colors.textMuted }}>
            {isLoading
              ? "Loading your watchlist…"
              : `${watchlistItems.length} ${watchlistItems.length === 1 ? "title" : "titles"} saved`}
          </Text>
        </div>
      </div>

      <div
        className="watchlist__toolbar"
        style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
      >
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={10} lg={10}>
            <Input
              placeholder="Search watchlist…"
              prefix={<SearchOutlined style={{ color: colors.textMuted }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: "100%" }}
              options={[
                { label: "Newest first",  value: "newest" },
                { label: "Oldest first",  value: "oldest" },
                { label: "A → Z",         value: "az" },
                { label: "Highest rated", value: "rating" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} className="watchlist__toolbar-layout">
            <Segmented
              value={layout}
              onChange={(v) => setLayout(v as "grid" | "list")}
              options={[
                { value: "grid", icon: <AppstoreOutlined /> },
                { value: "list", icon: <BarsOutlined /> },
              ]}
            />
          </Col>
        </Row>
      </div>

      {isLoading ? (
        <Row gutter={[16, 20]} className="watchlist__grid">
          {skeletonCols.map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6}>
              <Skeleton.Image active style={{ width: "100%", height: 180 }} />
              <Skeleton active paragraph={{ rows: 2 }} style={{ marginTop: 8 }} />
            </Col>
          ))}
        </Row>
      ) : watchlistItems.length === 0 ? (
        <Empty
          className="watchlist__empty"
          image={<HeartOutlined className="watchlist__empty-icon" />}
          description={
            <Space direction="vertical" align="center" size={4}>
              <Text strong style={{ fontSize: 16 }}>Your watchlist is empty</Text>
              <Text style={{ color: colors.textMuted }}>
                Browse movies and TV series and add them to watch later.
              </Text>
            </Space>
          }
        >
          <Button type="primary" onClick={() => navigate("/browse")}>
            Browse titles
          </Button>
        </Empty>
      ) : filtered.length === 0 ? (
        <Empty
          description={
            <Text style={{ color: colors.textMuted }}>
              No titles match "<strong>{search}</strong>"
            </Text>
          }
          style={{ padding: "60px 0" }}
        />
      ) : layout === "grid" ? (
        <Row gutter={[16, 20]} className="watchlist__grid">
          {filtered.map((item) => {
            const movie = watchlistItemToMovie(item);
            return (
              <Col key={item.movieId} xs={24} sm={12} md={8} lg={6} className="watchlist__card-col">
                <div className="watchlist__card-wrapper">
                  <MovieCard movie={movie} onPlay={playMovie} onDetail={openDetail} />
                  <Button
                    danger
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    loading={removeMutation.isPending && removeMutation.variables === item.movieId}
                    onClick={() => removeMutation.mutate(item.movieId)}
                    className="watchlist__remove-btn"
                    aria-label={`Remove ${item.title} from watchlist`}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Space direction="vertical" size={12} style={{ width: "100%" }} className="watchlist__list">
          {filtered.map((item) => {
            const movie = watchlistItemToMovie(item);
            return (
              <div key={item.movieId} className="watchlist__list-row">
                <MovieListRow movie={movie} onPlay={playMovie} onDetail={openDetail} />
                <Button
                  danger
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  loading={removeMutation.isPending && removeMutation.variables === item.movieId}
                  onClick={() => removeMutation.mutate(item.movieId)}
                  className="watchlist__remove-btn watchlist__remove-btn--list"
                  aria-label={`Remove ${item.title} from watchlist`}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </Space>
      )}
    </div>
  );
}
