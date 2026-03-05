# MCP 78 工具逐项复测报告（2026-03-05）

## 结论
- 总工具数（按源码 defineTool 实际统计）：**78**
- 本轮已修复异常：**2**（`collect_code`、`get_hook_data`，均已完成补测）
- 成功（实机复测）：**58**
- 成功（单测回归）：**14**
- 成功（预期失败/空结果）：**6**
- 未覆盖：**0**

## 修复项
1. `collect_code`
- 问题：`returnMode=summary/pattern/top-priority` 不触发采集，导致常返回空。
- 修复：先按需执行 `runtime.collector.collect(...)`，再输出对应视图。
- 代码：`src/tools/collector.ts`

2. `get_hook_data`
- 问题：浏览器端 hook 写入 `window.__hookStore`，服务端读取 `HookManager`，两侧数据未同步导致空结果。
- 修复：查询前先从当前页面同步 `__hookStore` 到 `HookManager`。
- 代码：`src/tools/hook.ts`

## 逐项清单
| 序号 | 工具 | 状态 | 说明 |
|---|---|---|---|
1. | `analyze_target` | 成功(实机复测) | 通过 MCP 实机调用验证
2. | `analyze_websocket_messages` | 成功(预期失败/空结果) | 实机调用成功：wsid 存在但无帧，返回 `<no messages>`
3. | `break_on_xhr` | 成功(实机复测) | 通过 MCP 实机调用验证
4. | `check_browser_health` | 成功(实机复测) | 通过 MCP 实机调用验证
5. | `click_element` | 成功(实机复测) | 通过 MCP 实机调用验证
6. | `collect_code` | 成功(单测回归) | 回归通过：`collector-hook-regression.test.ts` 验证 returnMode=top-priority 前会先执行 collect
7. | `collection_diff` | 成功(单测回归) | 通过单元测试覆盖
8. | `create_hook` | 成功(实机复测) | 通过 MCP 实机调用验证
9. | `delete_session_state` | 成功(实机复测) | 通过 MCP 实机调用验证
10. | `deobfuscate_code` | 成功(单测回归) | 通过单元测试覆盖
11. | `detect_crypto` | 成功(单测回归) | 通过单元测试覆盖
12. | `diff_env_requirements` | 成功(实机复测) | 通过 MCP 实机调用验证（输入 runtimeError + observedCapabilities）
13. | `dump_session_state` | 成功(实机复测) | 通过 MCP 实机调用验证
14. | `evaluate_on_callframe` | 成功(实机复测) | 断点命中后在 callframe 执行表达式并返回结果
15. | `evaluate_script` | 成功(实机复测) | 通过 MCP 实机调用验证
16. | `export_rebuild_bundle` | 成功(实机复测) | 对 `smoke-task-20260305` 实机导出 bundle 成功
17. | `export_session_report` | 成功(单测回归) | 通过单元测试覆盖
18. | `find_clickable_elements` | 成功(单测回归) | 通过单元测试覆盖
19. | `find_in_script` | 成功(实机复测) | 在 `handler.js` 中定位 `window.fetch` 位置成功
20. | `get_console_message` | 成功(实机复测) | 先注入 console marker，再按 msgid 读取成功
21. | `get_dom_structure` | 成功(实机复测) | 通过 MCP 实机调用验证
22. | `get_hook_data` | 成功(单测回归) | 回归通过：`collector-hook-regression.test.ts` 验证会先同步 `window.__hookStore` 再读取结果
23. | `get_network_request` | 成功(实机复测) | 对 `fetch https://example.com` 请求按 reqid 读取成功
24. | `get_paused_info` | 成功(实机复测) | 断点命中后可返回 paused reason / call stack
25. | `get_performance_metrics` | 成功(实机复测) | 通过 MCP 实机调用验证
26. | `get_request_initiator` | 成功(实机复测) | 对 reqid=132 返回 initiator 类型与调用栈
27. | `get_script_source` | 成功(实机复测) | 通过 MCP 实机调用验证
28. | `get_storage` | 成功(实机复测) | 通过 MCP 实机调用验证
29. | `get_websocket_message` | 成功(预期失败/空结果) | 实机验证空帧场景：`frameIndex out of range`
30. | `get_websocket_messages` | 成功(预期失败/空结果) | 实机调用成功：关闭连接且无帧时返回 `<no messages>`
31. | `hook_function` | 成功(实机复测) | 通过 MCP 实机调用验证
32. | `inject_hook` | 成功(实机复测) | 通过 MCP 实机调用验证
33. | `inject_preload_script` | 成功(实机复测) | 注入 preload 后 reload，页面可读到预设标记
34. | `inject_stealth` | 成功(单测回归) | 通过单元测试覆盖
35. | `inspect_object` | 成功(实机复测) | 对 `window.location.href` 结构化检查成功
36. | `list_breakpoints` | 成功(实机复测) | 通过 MCP 实机调用验证
37. | `list_console_messages` | 成功(实机复测) | 通过 MCP 实机调用验证
38. | `list_frames` | 成功(实机复测) | 在 `m.jd.com` 返回主 frame + 子 frame 列表
39. | `list_hooks` | 成功(实机复测) | 通过 MCP 实机调用验证
40. | `list_network_requests` | 成功(实机复测) | 通过 MCP 实机调用验证
41. | `list_pages` | 成功(实机复测) | 通过 MCP 实机调用验证
42. | `list_scripts` | 成功(实机复测) | 通过 MCP 实机调用验证
43. | `list_session_states` | 成功(实机复测) | 通过 MCP 实机调用验证
44. | `list_stealth_features` | 成功(实机复测) | 返回 stealth feature 列表成功
45. | `list_stealth_presets` | 成功(实机复测) | 返回 stealth preset 列表成功
46. | `list_websocket_connections` | 成功(预期失败/空结果) | 预期空结果：当前测试页面无 WebSocket 连接
47. | `load_session_state` | 成功(实机复测) | 通过 MCP 实机调用验证
48. | `monitor_events` | 成功(实机复测) | 通过 MCP 实机调用验证
49. | `navigate_page` | 成功(实机复测) | 通过 MCP 实机调用验证
50. | `new_page` | 成功(实机复测) | 通过 MCP 实机调用验证
51. | `pause` | 成功(实机复测) | `pause` 调用返回成功（复杂站点下暂停时机受执行状态影响）
52. | `query_dom` | 成功(实机复测) | 通过 MCP 实机调用验证
53. | `record_reverse_evidence` | 成功(实机复测) | 对 `smoke-task-20260305` 写入 runtime-evidence 成功
54. | `remove_breakpoint` | 成功(实机复测) | 删除已设置断点成功
55. | `remove_hook` | 成功(单测回归) | 通过单元测试覆盖
56. | `remove_xhr_breakpoint` | 成功(实机复测) | 通过 MCP 实机调用验证
57. | `restore_session_state` | 成功(预期失败/空结果) | 预期失败场景已验证：sessionId 不存在时返回 not found
58. | `resume` | 成功(实机复测) | 断点后恢复执行成功
59. | `risk_panel` | 成功(单测回归) | 通过单元测试覆盖
60. | `save_session_state` | 成功(实机复测) | 通过 MCP 实机调用验证
61. | `search_in_scripts` | 成功(实机复测) | 通过 MCP 实机调用验证
62. | `search_in_sources` | 成功(实机复测) | 通过 MCP 实机调用验证
63. | `select_frame` | 成功(实机复测) | 切换主 frame/子 frame 成功
64. | `select_page` | 成功(实机复测) | 多 tab 间切换并回到 `m.jd.com` 成功
65. | `set_breakpoint` | 成功(实机复测) | 在 `handler.js` 指定行列设置断点成功
66. | `set_breakpoint_on_text` | 成功(实机复测) | 文本定位断点并命中成功
67. | `set_user_agent` | 成功(实机复测) | UA 更新成功，并在后续请求头中可见
68. | `step_into` | 成功(实机复测) | 断点态执行 step into 成功
69. | `step_out` | 成功(实机复测) | 断点态执行 step out 成功
70. | `step_over` | 成功(实机复测) | 断点态执行 step over 成功
71. | `stop_monitor` | 成功(实机复测) | 通过 MCP 实机调用验证
72. | `summarize_code` | 成功(单测回归) | 通过单元测试覆盖
73. | `take_screenshot` | 成功(实机复测) | 通过 MCP 实机调用验证
74. | `trace_function` | 成功(实机复测) | 对 `mcp78BreakFn` 安装 trace 并记录调用日志成功
75. | `type_text` | 成功(单测回归) | 通过单元测试覆盖
76. | `understand_code` | 成功(单测回归) | 通过单元测试覆盖
77. | `unhook_function` | 成功(预期失败/空结果) | 预期失败场景已验证：hookId 不存在时返回 Hook not found
78. | `wait_for_element` | 成功(单测回归) | 通过单元测试覆盖

## 验证命令
`npm run build && node --require ./build/tests/setup.js --no-warnings=ExperimentalWarning --test build/tests/unit/modules/PageController.test.js build/tests/unit/tools/collector-hook-regression.test.js build/tests/unit/tools/jshook-tools.handlers.test.js build/tests/unit/tools/jshook-tools.test.js`

结果：全部通过（12/12）。

## MCP 实例补测（m.jd.com）
- 页面：`https://m.jd.com/`
- 网络链路验证：`get_network_request(reqid=132)`、`get_request_initiator(requestId=132)` 成功
- WebSocket 验证：`wsid=1 (wss://echo.websocket.events, closed, 0 frames)`，相关工具按空流量场景返回
- 调试链路验证：`set_breakpoint`/`set_breakpoint_on_text` 命中后，`get_paused_info`、`evaluate_on_callframe`、`step_over`/`step_into`/`step_out`、`resume` 均可用
