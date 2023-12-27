import * as React from "react";
import "./App.css";
import Hammer from "hammerjs";

function App() {
  const [pinchEnabled, setPinchEnabled] = React.useState(true);
  const [rotateEnabled, setRotateEnabled] = React.useState(false);
  const [swipeEnabled, setSwipeEnabled] = React.useState(false);
  const [pan1Enabled, setPan1Enabled] = React.useState(false);
  const [pan2Enabled, setPan2Enabled] = React.useState(false);
  const [tap1Enabled, setTap1Enabled] = React.useState(false);
  const [tap2Enabled, setTap2Enabled] = React.useState(false);
  const [pressEnabled, setPressEnabled] = React.useState(false);
  const [manager, setManager] = React.useState<HammerManager>();
  const elm = React.useRef(null);

  // 初期化
  React.useEffect(() => {
    if (!elm.current) return;
    const mc = new Hammer.Manager(elm.current);
    // ピンチ操作を作成
    const pinch = new Hammer.Pinch();
    // ローテイト操作を作成
    const rotate = new Hammer.Rotate();
    // スワイプ操作を作成
    const swipe = new Hammer.Swipe();
    // 指1本でのパン操作を作成
    const pan1 = new Hammer.Pan({ event: "pan1", threshold: 0, pointers: 1 });
    // 指2本でのパン操作を作成
    const pan2 = new Hammer.Pan({ event: "pan2", threshold: 0, pointers: 2 });
    // 指1本でのタップ操作を作成
    const tap1 = new Hammer.Tap({ event: "tap1", taps: 1 });
    // 指2本でのタップ操作を作成
    const tap2 = new Hammer.Tap({ event: "tap2", taps: 2 });
    // プレス操作を作成
    const press = new Hammer.Press({ time: 250 });
    // ピンチ操作とローテイト操作を同時に認識する
    pinch.recognizeWith(rotate);
    // 2本指パン操作とピンチ操作を同時に認識する
    pan2.recognizeWith(pinch);
    // 1本指パン操作とスワイプ操作を同時に認識する
    pan1.recognizeWith(swipe);
    // 2本指タップ操作と1本指タップ操作を同時に認識する
    tap2.recognizeWith(tap1);
    // プレス操作と1本指タップ操作を同時に認識する
    press.recognizeWith(tap1);
    // イベントリスナーにすべてのタッチ操作を追加
    mc.add([pinch, rotate, swipe, pan1, pan2, tap1, tap2, press]);
    // HammerManagerの初期化
    mc.get("pinch").set({ enable: pinchEnabled });
    mc.get("rotate").set({ enable: rotateEnabled });
    mc.get("swipe").set({ enable: swipeEnabled });
    mc.get("pan1").set({ enable: pan1Enabled });
    mc.get("pan2").set({ enable: pan2Enabled });
    mc.get("tap1").set({ enable: tap1Enabled });
    mc.get("tap2").set({ enable: tap2Enabled });
    mc.get("press").set({ enable: pressEnabled });
    // ピンチ操作時の処理
    mc.on("pinch", function (ev) {
      console.log("pinch");
      console.log(ev);
    });
    // ローテイト操作時の処理
    mc.on("rotate", function (ev) {
      console.log("rotate");
      console.log(ev);
    });
    // スワイプ操作時の処理
    mc.on("swipe", function (ev) {
      console.log("swipe");
      console.log(ev);
    });
    // 1本指パン操作時の処理
    mc.on("pan1", function (ev) {
      console.log("pan1");
      console.log(ev);
    });
    // 2本指パン操作時の処理
    mc.on("pan2", function (ev) {
      console.log("pan2");
      console.log(ev);
    });
    // 1本指タップ操作時の処理
    mc.on("tap1", function (ev) {
      console.log("tap1");
      console.log(ev);
    });
    // 2本指タップ操作時の処理
    mc.on("tap2", function (ev) {
      console.log("tap2");
      console.log(ev);
    });
    // プレス操作時の処理
    mc.on("press", function (ev) {
      console.log("press");
      console.log(ev);
    });
    setManager(mc);
  }, []);

  return (
    <>
      <h3>Hammerによるタッチパネル操作</h3>
      <div>
        <input
          type="checkbox"
          checked={pinchEnabled}
          onChange={() => {
            manager?.get("pinch").set({ enable: !pinchEnabled });
            setPinchEnabled(!pinchEnabled);
          }}
        />
        ：ピンチ操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={rotateEnabled}
          onChange={() => {
            manager?.get("rotate").set({ enable: !rotateEnabled });
            setRotateEnabled(!rotateEnabled);
          }}
        />
        ：ローテイト操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={swipeEnabled}
          onChange={() => {
            manager?.get("swipe").set({ enable: !swipeEnabled });
            setSwipeEnabled(!swipeEnabled);
          }}
        />
        ：スワイプ操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={pan1Enabled}
          onChange={() => {
            console.log(pan1Enabled);
            manager?.get("pan1").set({ enable: !pan1Enabled });
            setPan1Enabled(!pan1Enabled);
          }}
        />
        ：１本指パン操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={pan2Enabled}
          onChange={() => {
            manager?.get("pan2").set({ enable: !pan2Enabled });
            setPan2Enabled(!pan2Enabled);
          }}
        />
        ：２本指パン操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={tap1Enabled}
          onChange={() => {
            manager?.get("tap1").set({ enable: !tap1Enabled });
            setTap1Enabled(!tap1Enabled);
          }}
        />
        ：１本指タップ操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={tap2Enabled}
          onChange={() => {
            manager?.get("tap2").set({ enable: !tap2Enabled });
            setTap2Enabled(!tap2Enabled);
          }}
        />
        ：２本指タップ操作有効化
      </div>
      <div>
        <input
          type="checkbox"
          checked={pressEnabled}
          onChange={() => {
            manager?.get("press").set({ enable: !pressEnabled });
            setPressEnabled(!pressEnabled);
          }}
        />
        ：プレス操作有効化
      </div>
      <h3>タッチエリア</h3>
      <div>操作結果はコンソールに出力</div>
      <div className="area_hammer" ref={elm}></div>
    </>
  );
}

export default App;
