#!/usr/bin/env bash
set -e

# ---------- 配置 ----------
NETWORK=kong-net
DB_CONTAINER=kong-database
KONG_CONTAINER=kong
# --------------------------

# 颜色输出
RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'
log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 1. 起数据库
if docker ps -a --format '{{.Names}}' | grep -q "^${DB_CONTAINER}$"; then
    log_info "检测到数据库容器，直接启动 …"
    docker start "${DB_CONTAINER}"
else
    log_error "未找到数据库容器 ${DB_CONTAINER}，请确认已创建或改用完整安装脚本"
    exit 1
fi

# 2. 起 Kong
if docker ps -a --format '{{.Names}}' | grep -q "^${KONG_CONTAINER}$"; then
    log_info "检测到 Kong 容器，直接启动 …"
    docker start "${KONG_CONTAINER}"
else
    log_error "未找到 Kong 容器 ${KONG_CONTAINER}，请确认已创建或改用完整安装脚本"
    exit 1
fi

# 3. 等待 Kong Admin API 就绪
log_info "等待 Kong Admin API 就绪 …"
until curl -s http://localhost:8001 &>/dev/null; do
    sleep 2
done

log_info "✅ 两个服务已重新启动！"
log_info "Kong Admin API : http://localhost:8001"
log_info "Kong Manager   : http://localhost:8002"
