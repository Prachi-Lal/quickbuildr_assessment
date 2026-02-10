import logging
from pathlib import Path
from datetime import datetime


def setup_logging() -> logging.Logger:
    """Configure root logger to write to console and a dated file in backend/logs."""
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.DEBUG)

    # ensure logs directory exists at backend/logs
    log_dir = Path(__file__).parent.parent / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    today = datetime.now().strftime("%Y-%m-%d")
    log_file = log_dir / f"log_{today}.txt"

    # clear existing handlers
    root_logger.handlers = []

    # console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    ch.setFormatter(ch_formatter)
    root_logger.addHandler(ch)

    # file handler (DEBUG+)
    fh = logging.FileHandler(log_file, encoding="utf-8")
    fh.setLevel(logging.DEBUG)
    fh_formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    fh.setFormatter(fh_formatter)
    root_logger.addHandler(fh)

    root_logger.info(f"Logging initialized. Writing logs to: {log_file}")
    return logging.getLogger(__name__)
