#!/bin/bash

# Kong Gateway Testing Framework - Health Check Script
# This script performs comprehensive health checks on the testing framework

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Status tracking
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Helper functions
print_header() {
    echo -e "\n${BLUE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}                    ${GREEN}Kong Gateway Testing Framework${NC}                    ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC}                           ${YELLOW}Health Check Report${NC}                           ${BLUE}║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo -e "${BLUE}Date: $(date)${NC}\n"
}

print_section() {
    echo -e "\n${YELLOW}▶ $1${NC}"
    echo -e "${YELLOW}$(printf '=%.0s' $(seq 1 ${#1}))${NC}"
}

print_check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ $2 -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} $1"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "  ${RED}✗${NC} $1"
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
    fi
}

print_warning() {
    echo -e "  ${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "  ${BLUE}ℹ${NC} $1"
}

print_footer() {
    echo -e "\n${BLUE}════════════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}Health Check Summary${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "Total Checks: ${TOTAL_CHECKS}"
    echo -e "Passed: ${GREEN}${PASSED_CHECKS}${NC}"
    echo -e "Failed: ${RED}${FAILED_CHECKS}${NC}"
    echo -e "Success Rate: ${GREEN}$(echo "scale=2; $PASSED_CHECKS * 100 / $TOTAL_CHECKS" | bc)%${NC}"

    if [ $FAILED_CHECKS -eq 0 ]; then
        echo -e "\n${GREEN}✅ All health checks passed! The testing framework is healthy.${NC}"
        exit 0
    else
        echo -e "\n${RED}❌ Some health checks failed. Please review the issues above.${NC}"
        exit 1
    fi
}

# Check system requirements
check_system_requirements() {
    print_section "System Requirements"

    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_check "Node.js is installed ($NODE_VERSION)" 0
    else
        print_check "Node.js is not installed" 1
    fi

    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_check "npm is installed ($NPM_VERSION)" 0
    else
        print_check "npm is not installed" 1
    fi

    # Check Docker
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        print_check "Docker is installed ($DOCKER_VERSION)" 0

        # Check Docker daemon
        if docker info &> /dev/null; then
            print_check "Docker daemon is running" 0
        else
            print_check "Docker daemon is not running" 1
        fi
    else
        print_check "Docker is not installed" 1
    fi

}

check_dependencies() {
    print_section "Dependencies"

    # To be checked modules
    local deps=("cypress" "wait-on" "mochawesome")
    local all_exist=true

    for dep in "${deps[@]}"; do
        if npm ls --depth=0 "$dep" &>/dev/null; then
            print_check "$dep is installed" 0
        else
            print_check "$dep is not installed" 1
            all_exist=false
        fi
    done

    if ! $all_exist; then
        print_warning "Run 'npm install' to install missing dependencies"
    fi

    if $all_exist; then
        if npm outdated --silent &>/dev/null; then
            print_check "All dependencies are up to date" 0
        else
            print_warning "Some dependencies are outdated"
            npm outdated --silent 2>/dev/null \
                | grep -E "(Package|Current|Wanted|Latest)" || true
        fi
    fi
}

# Check Cypress installation
check_cypress() {
    print_section "Cypress Installation"

    # Check Cypress binary
    if npx cypress verify &> /dev/null; then
        print_check "Cypress binary is valid" 0

        # Get Cypress version
        CYPRESS_VERSION=$(npx cypress --version | head -1 | awk '{print $2}')
        print_info "Cypress version: $CYPRESS_VERSION"
    else
        print_check "Cypress binary verification failed" 1
        print_warning "Run 'npx cypress install' to install Cypress binary"
    fi

    # Check Cypress configuration
    if [ -f "cypress.config.js" ]; then
        print_check "Cypress configuration file exists" 0

        # Validate configuration syntax
        if node -e "require('./cypress.config.js')" &> /dev/null; then
            print_check "Cypress configuration is valid" 0
        else
            print_check "Cypress configuration has syntax errors" 1
        fi
    else
        print_check "Cypress configuration file missing" 1
    fi
}


# Main execution
main() {
    print_header

    check_system_requirements
    check_dependencies

    print_footer
}

# Run health check
main "$@"
