#!/usr/bin/env bash
# local-ci.sh
set -euo pipefail

echo "==== 0. Env ===="
export NODE_ENV=ci
chmod +x ../scripts/health-check.sh && ../scripts/health-check.sh

echo "==== 1. Clean reports ===="
rm -rf reports/html cypress/videos cypress/screenshots

echo "==== 2. Install dependency（CI mode）==="
# npm ci

echo "==== 3. Start Kong + Kong-Manager and wait it ok ===="
chmod +x ../scripts/run-kong.sh && ../scripts/run-kong.sh

# HealthCheck：Wait 8002 port
echo "Waiting for Kong-Manager on :8002 ..."
host=localhost
port=8002
max=60

for ((i=0;i<max;i++)); do
  if </dev/tcp/$host/$port 2>/dev/null; then
    echo "Port $port is ready"
    break
  fi
  sleep 1
done
if ! </dev/tcp/$host/$port 2>/dev/null; then
  echo "Waited $max seconds, but port $port not ready, keep going anyway..." >&2
fi
echo "Kong-Manager is up!"

echo "==== 4. Run Cypress ===="
set -e
browsers=(electron chrome)
for b in "${browsers[@]}"; do
  echo "==== Running $b ===="
  npx cypress run --record false --browser "$b" \
    --reporter mochawesome \
    --reporter-options "reportDir=reports/json,overwrite=false,html=false,json=true"
done

echo "==== Merge Into one report ===="
npx mochawesome-merge reports/json/*.json -o reports/merged.json
npx marge reports/merged.json -f index -o reports/html -i

echo "==== 5. Stop backend ===="
# kill $KONG_PID || true
# wait $KONG_PID 2>/dev/null || true

echo "==== 6. Result ===="
if [ -f reports/html/index.html ]; then
   echo "✅ Test done，please open reports/html/index.html "
else
   echo "❌ No Report"
   exit 1
fi
