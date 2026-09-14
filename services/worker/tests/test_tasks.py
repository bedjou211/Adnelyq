from worker.tasks.system import ping


def test_ping_task() -> None:
    assert ping.run() == {"status": "ok"}
