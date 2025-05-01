"use client";
import styles from "./page.module.css";
import {
  Badge,
  Button,
  Card,
  Col,
  Input,
  Layout,
  notification,
  Result,
  Row,
  Spin,
} from "antd";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [disableInput, setDisableInput] = useState(false);
  const checkFact = async () => {
    if(!message){
      return;
    }
    setChecking(true);
    setDisableInput(true);
    const resp = await fetch("/api/checkfact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "user_message",
        input: { content: "fact check:" + message },
      }),
    });
    const respJson = await resp.json();
    setTestResult(respJson);
    setChecking(false);
    setTimeout(() => {
      setDisableInput(false);
    }, 5000);
  };
  const pasteMessage = async () => {
    const text = await window.navigator.clipboard.readText();
    setMessage(text);
  };
  const copyFacts = async () => {
    await window.navigator.clipboard.writeText(testResult.facts.join("\n"));
    notification.success({
      message: "Copied to clipboard",
    });
  };
  return (
    <Layout>
      <Layout.Header>
        <Badge
          count={0}
          title="Coins are coming soon to fact check Images and Videos"
        >
          Coins
        </Badge>
      </Layout.Header>
      <Layout.Content>
        <div className={styles.page}>
          <main className={styles.main}>
            <div className={styles.colFlex8g}>
              <h2>Fact Checken</h2>
              <h4>
                Got a forwarded message or Suscpectible claim? Check the facts
                before you believe it!
              </h4>
            </div>
            <div className={styles.inputWrap}>
              <Input.TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.inputTextarea}
                placeholder="Paste your content here"
                disabled={checking}
                autoSize={{
                  minRows: 3
                }}
              />
              <div className={styles.spFlex8g}>
                <Button onClick={pasteMessage} disabled={checking}>
                  Paste
                </Button>
                <Button type="primary" onClick={checkFact} loading={checking} disabled={disableInput}>
                  Check
                </Button>
              </div>
            </div>
            {testResult && (
              <Result
                status={
                  testResult?.fully_correct
                    ? "success"
                    : testResult?.partially_correct
                    ? "warning"
                    : "error"
                }
                title={
                  testResult?.fully_correct
                    ? "That is correct"
                    : testResult?.partially_correct
                    ? "That is not fully correct"
                    : "That is not correct"
                }
                subTitle="Accuracy of facts depends on the context that may not be known to the AI."
                style={{ padding: 8 }}
                className={styles.resultWrap}
              >
                <Spin spinning={checking}>
                  <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} md={12}>
                      <Card title="Claims">
                        <ul>
                          {testResult?.claims.map((row, index) => (
                            <li key={index}>
                              {`${row.is_correct ? "✅" : "❌"} - ${row.claim}`}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card
                        title="Facts"
                        extra={<Button onClick={copyFacts}>Copy</Button>}
                      >
                        <ul>
                          {testResult?.facts.map((row, index) => (
                            <li key={index}>✅ - {row}</li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    {/* <Col span={24}><Button type="primary">Copy this</Button></Col> */}
                  </Row>
                </Spin>
              </Result>
            )}
          </main>
        </div>
      </Layout.Content>
      <Layout.Footer>
      <footer>
            <center>
              <div>Powered by: Gemini, Zod, Vercel, Antd, Github</div>
              <div>
                Have suggestions? Raise an issue on{" "}
                <a href="https://github.com/imismailpe/factchecken">Here</a>{" "}
              </div>
            </center>
          </footer>
      </Layout.Footer>
    </Layout>
  );
}
