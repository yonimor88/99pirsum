/*
 * Soundtrack for ad.html, synthesised offline with the Web Audio API: no samples, nothing to license.
 * 120 BPM (a beat every 0.5 s), one chord per bar (2 s). Sound effects use the cue times in ad.html.
 * window.__renderAudio() resolves to a base64 16-bit stereo WAV of the whole ad.
 */
window.__renderAudio = async function renderAudio() {
  const SR = 44100;
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * DURATION), SR);

  // deterministic noise
  let seed = 20261110;
  const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const noise = ctx.createBuffer(1, SR * 2, SR);
  noise.getChannelData(0).forEach((_, i, a) => (a[i] = rnd() * 2 - 1));

  /* ---------- buses ---------- */
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14; comp.knee.value = 8; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.18;
  comp.connect(ctx.destination);
  const master = ctx.createGain();
  master.connect(comp);
  master.gain.setValueAtTime(1, 0);
  master.gain.setValueAtTime(1, DURATION - 0.9);
  master.gain.linearRampToValueAtTime(0, DURATION);

  const verb = ctx.createConvolver();
  const ir = ctx.createBuffer(2, SR * 2.6, SR);
  for (let c = 0; c < 2; c++) ir.getChannelData(c).forEach((_, i, a) => (a[i] = (rnd() * 2 - 1) * Math.pow(1 - i / a.length, 3.2)));
  verb.buffer = ir;
  const verbIn = ctx.createGain(); verbIn.gain.value = 0.5;
  const verbOut = ctx.createGain(); verbOut.gain.value = 0.32;
  verbIn.connect(verb); verb.connect(verbOut); verbOut.connect(master);

  // music runs through a gain that the kick "pumps" (sidechain feel)
  const duck = ctx.createGain(); duck.connect(master);
  const music = ctx.createGain(); music.gain.value = 0.55; music.connect(duck);
  const drums = ctx.createGain(); drums.gain.value = 0.9; drums.connect(master);
  const sfx = ctx.createGain(); sfx.gain.value = 0.75; sfx.connect(master);

  const padFilter = ctx.createBiquadFilter();
  padFilter.type = "lowpass"; padFilter.Q.value = 0.7;
  padFilter.frequency.setValueAtTime(420, 0);
  padFilter.frequency.exponentialRampToValueAtTime(1500, 3.95);
  padFilter.frequency.setValueAtTime(2300, 4.0);
  padFilter.connect(music);
  const padSend = ctx.createGain(); padSend.gain.value = 0.35; padFilter.connect(padSend); padSend.connect(verbIn);

  /* ---------- helpers ---------- */
  const osc = (type, f) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; return o; };
  const gainNode = (v = 0) => { const g = ctx.createGain(); g.gain.value = v; return g; };
  const filt = (type, f, q = 0.7) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; };
  const noiseSrc = (t, dur) => { const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.start(t, rnd() * 1.5, dur + 0.05); return s; };
  /** percussive envelope: instant attack, exponential decay */
  const perc = (g, t, peak, decay, attack = 0.002) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  };
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  /* ---------- instruments ---------- */
  function kick(t, vel = 1) {
    const o = osc("sine", 150), g = gainNode();
    o.frequency.setValueAtTime(165, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.13);
    perc(g, t, 0.95 * vel, 0.42);
    o.connect(g); g.connect(drums); o.start(t); o.stop(t + 0.5);
    const n = noiseSrc(t, 0.02), hp = filt("highpass", 2500), ng = gainNode();
    perc(ng, t, 0.12 * vel, 0.012);
    n.connect(hp); hp.connect(ng); ng.connect(drums);
    // pump the music
    duck.gain.setValueAtTime(0.42, t);
    duck.gain.setTargetAtTime(1, t + 0.03, 0.085);
  }
  function clap(t, vel = 1) {
    const n = noiseSrc(t, 0.3), bp = filt("bandpass", 1500, 0.9), g = gainNode();
    g.gain.setValueAtTime(0.0001, t);
    [0, 0.011, 0.022].forEach((d) => { g.gain.setValueAtTime(0.32 * vel, t + d); g.gain.exponentialRampToValueAtTime(0.05, t + d + 0.009); });
    g.gain.setValueAtTime(0.28 * vel, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    n.connect(bp); bp.connect(g); g.connect(drums);
    const s = gainNode(0.25); g.connect(s); s.connect(verbIn);
  }
  function hat(t, vel = 1, open = false) {
    const n = noiseSrc(t, 0.2), hp = filt("highpass", 7500), g = gainNode();
    perc(g, t, 0.11 * vel, open ? 0.12 : 0.035);
    n.connect(hp); hp.connect(g); g.connect(drums);
  }
  function bass(t, f, dur = 0.2) {
    const o = osc("sawtooth", f), sub = osc("sine", f), lp = filt("lowpass", 900, 3), g = gainNode();
    lp.frequency.setValueAtTime(1100, t);
    lp.frequency.exponentialRampToValueAtTime(240, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.42, t + 0.008);
    g.gain.setValueAtTime(0.42, t + dur - 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const sg = gainNode(0.5);
    o.connect(lp); lp.connect(g); sub.connect(sg); sg.connect(g); g.connect(music);
    [o, sub].forEach((x) => { x.start(t); x.stop(t + dur + 0.02); });
  }
  function padChord(t, dur, notes, level = 0.07) {
    const g = gainNode();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + 0.12);
    g.gain.setValueAtTime(level, t + dur - 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.45);
    g.connect(padFilter);
    notes.forEach((n) => [-7, 7].forEach((cents) => {
      const o = osc("sawtooth", midi(n)); o.detune.value = cents; o.connect(g); o.start(t); o.stop(t + dur + 0.5);
    }));
  }
  function pluck(t, n, vel = 1) {
    const o = osc("triangle", midi(n)), o2 = osc("square", midi(n) * 2), lp = filt("lowpass", 2800), g = gainNode(), g2 = gainNode(0.12);
    perc(g, t, 0.085 * vel, 0.24);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(lp); lp.connect(music);
    const s = gainNode(0.5); lp.connect(s); s.connect(verbIn);
    [o, o2].forEach((x) => { x.start(t); x.stop(t + 0.3); });
  }
  /** soft bell / marimba: a fundamental plus inharmonic partials */
  function bell(t, f, vel = 1, decay = 0.9) {
    [[1, 1, decay], [2.76, 0.32, decay * 0.45], [5.4, 0.12, decay * 0.25]].forEach(([m, a, d]) => {
      const o = osc("sine", f * m), g = gainNode();
      perc(g, t, 0.2 * vel * a, d, 0.003);
      o.connect(g); g.connect(sfx);
      const s = gainNode(0.6); g.connect(s); s.connect(verbIn);
      o.start(t); o.stop(t + d + 0.05);
    });
  }
  function pop(t, f = 700, vel = 1) {
    const o = osc("sine", f), g = gainNode();
    o.frequency.setValueAtTime(f * 1.7, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.045);
    perc(g, t, 0.3 * vel, 0.11, 0.003);
    o.connect(g); g.connect(sfx); o.start(t); o.stop(t + 0.16);
  }
  function tick(t, vel = 1, f = 3200) {
    const n = noiseSrc(t, 0.03), bp = filt("bandpass", f, 2.5), g = gainNode();
    perc(g, t, 0.35 * vel, 0.018, 0.001);
    n.connect(bp); bp.connect(g); g.connect(sfx);
  }
  /** filtered-noise whoosh that peaks at `peak` */
  function whoosh(peak, dur = 0.55, vel = 1, f0 = 350, f1 = 5000) {
    const t = peak - dur;
    const n = noiseSrc(t, dur + 0.3), bp = filt("bandpass", f0, 1.1), g = gainNode();
    bp.frequency.setValueAtTime(f0, t);
    bp.frequency.exponentialRampToValueAtTime(f1, peak);
    bp.frequency.exponentialRampToValueAtTime(f1 * 0.5, peak + 0.25);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.38 * vel, peak - 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, peak + 0.26);
    n.connect(bp); bp.connect(g); g.connect(sfx);
    const s = gainNode(0.5); g.connect(s); s.connect(verbIn);
  }
  function impact(t, vel = 1) {
    const o = osc("sine", 70), g = gainNode();
    o.frequency.setValueAtTime(90, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.5);
    perc(g, t, 0.55 * vel, 0.9);
    o.connect(g); g.connect(sfx); o.start(t); o.stop(t + 1);
    const n = noiseSrc(t, 0.6), lp = filt("lowpass", 1800), ng = gainNode();
    perc(ng, t, 0.22 * vel, 0.45);
    n.connect(lp); lp.connect(ng); ng.connect(sfx);
    const s = gainNode(0.7); ng.connect(s); s.connect(verbIn);
  }
  /** a classic telephone ring: 440 + 480 Hz, trilled at 20 Hz */
  function ring(t0, t1) {
    const env = gainNode(), trill = gainNode(0.5), lfo = osc("square", 20), lfoAmt = gainNode(0.5), lp = filt("lowpass", 2600);
    lfo.connect(lfoAmt); lfoAmt.connect(trill.gain);
    [440, 480].forEach((f) => { const o = osc("sine", f); o.connect(trill); o.start(t0); o.stop(t1 + 0.1); });
    lfo.start(t0); lfo.stop(t1 + 0.1);
    env.gain.setValueAtTime(0.0001, t0);
    env.gain.linearRampToValueAtTime(0.16, t0 + 0.02);
    env.gain.setValueAtTime(0.16, t1 - 0.03);
    env.gain.linearRampToValueAtTime(0.0001, t1);
    trill.connect(lp); lp.connect(env); env.connect(sfx);
  }
  function riser(t0, t1) {
    const n = noiseSrc(t0, t1 - t0 + 0.1), bp = filt("bandpass", 200, 1.4), g = gainNode();
    bp.frequency.setValueAtTime(200, t0);
    bp.frequency.exponentialRampToValueAtTime(7000, t1);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.3, t1 - 0.02);
    g.gain.linearRampToValueAtTime(0.0001, t1 + 0.02);
    n.connect(bp); bp.connect(g); g.connect(sfx);
  }

  /* ---------- the music ---------- */
  // one chord per bar: [bass root, pad voicing] in MIDI notes
  const Am = [45, [57, 60, 64]], F = [41, [57, 60, 65]], C = [48, [55, 60, 64]], G = [43, [55, 59, 62]];
  const BARS = [Am, F, C, G, Am, F, C, G, Am, F, C, G, Am, F, G, C];
  BARS.forEach(([root, voicing], b) => {
    const t = b * 2;
    const last = b === BARS.length - 1;
    padChord(t, last ? 1.2 : 2, voicing, b < 2 ? 0.09 : 0.075);
    if (t >= 4 && t < 30) {
      for (let e = 0; e < 8; e++) bass(t + e * 0.25, midi(root + (e % 2 ? 12 : 0)), 0.2);
    }
    // arpeggio over the middle of the ad
    if (t >= 10 && t < 26) {
      const tones = [...voicing.map((n) => n + 12), voicing[0] + 24];
      const pattern = [0, 1, 2, 3, 2, 1, 2, 3];
      for (let s16 = 0; s16 < 16; s16++) pluck(t + s16 * 0.125, tones[pattern[s16 % 8]], s16 % 4 === 0 ? 1 : 0.6);
    }
  });
  // final chord, rung out
  padChord(30, 1.6, [48, 55, 60, 64, 67], 0.085);

  for (let b = 4; b < 30; b += 0.5) {
    const inBar = (b % 2) / 0.5; // beat 0..3 within the bar
    kick(b, inBar === 0 ? 1 : 0.85);
    if (inBar === 1 || inBar === 3) clap(b, 0.9);
    hat(b + 0.25, 1, b >= 10 && b < 26 && inBar === 3);
    if (b >= 10 && b < 26) { hat(b + 0.125, 0.45); hat(b + 0.375, 0.45); }
  }
  kick(30, 1.1);

  /* ---------- sound effects on the picture's cues ---------- */
  // 1 · hook
  [0.12, 0.42, 0.78].forEach((t, i) => { pop(t + 0.05, 260 + i * 60, 0.8); tick(t + 0.05, 0.4, 1800); });
  whoosh(1.62, 0.35, 0.45, 900, 6000); // marker sweep
  pop(1.62, 520, 0.9);
  ring(2.0, 2.5);
  ring(2.75, 3.25);
  pop(2.22, 880, 0.55);
  riser(2.9, 4.0);
  impact(4.0);

  // 2 · showcase: a swish as each phone slides in
  [5, 6, 7, 8, 9].forEach((t) => whoosh(t, 0.4, 0.55, 600, 4200));
  whoosh(10.5, 0.55, 0.9);
  impact(10.5, 0.6);

  // 3 · Google
  pop(11.0, 600, 0.8);
  for (let i = 0; i < QUERY.length; i++) tick(TYPE_FROM + ((i + 1) / QUERY.length) * (TYPE_TO - TYPE_FROM) - 0.01, 0.55 + 0.45 * rnd(), 2600 + rnd() * 1400);
  pop(12.5, 520, 0.9);
  [0, 1, 2, 3].forEach((i) => pop(12.75 + i * 0.08, 900 + i * 120, 0.35));
  pop(13.0, 760, 1);
  tick(13.0, 0.6, 1200);
  whoosh(13.6, 0.4, 0.5, 300, 2500);
  SCORES.forEach((s, i) => {
    // a rising tone as each ring fills
    const at = RINGS_AT + i * 0.12;
    const o = osc("sine", 300), g = gainNode();
    o.frequency.setValueAtTime(330, at);
    o.frequency.exponentialRampToValueAtTime(s.value === 100 ? 990 : 940, at + 0.9);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.linearRampToValueAtTime(0.045, at + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 1.1);
    o.connect(g); g.connect(sfx); o.start(at); o.stop(at + 1.15);
  });
  bell(15.0, midi(84), 1.0, 1.3); // the 100s land
  bell(15.12, midi(88), 0.9, 1.3);
  bell(15.24, midi(91), 0.8, 1.6);

  // bands
  whoosh(16.0, 0.6, 1.0, 300, 6000);
  impact(16.0, 0.8);

  // 4 · WhatsApp
  pop(TAP_AT, 420, 1);
  tick(TAP_AT, 0.8, 1500);
  whoosh(17.95, 0.3, 0.4, 500, 3000); // chat opens
  whoosh(SENT_AT, 0.18, 0.5, 1200, 6000); // send
  pop(SENT_AT + 0.03, 980, 0.7);
  bell(REPLY_AT, midi(81), 0.8, 0.5); // incoming message
  bell(REPLY_AT + 0.09, midi(88), 0.8, 0.6);
  [0, 1, 2].forEach((i) => { bell(NOTIFS_AT + i * 0.5, midi(84 + i * 2), 0.75, 0.55); bell(NOTIFS_AT + i * 0.5 + 0.08, midi(91 + i * 2), 0.6, 0.7); });

  // 5 · features: a marimba run up the scale, one note per chip
  whoosh(22.0, 0.55, 0.9);
  impact(22.0, 0.7);
  [72, 74, 76, 79, 81, 84, 86, 88].forEach((n, i) => { bell(CHIPS_AT + i * 0.25, midi(n), 0.8, 0.5); pop(CHIPS_AT + i * 0.25, 300, 0.35); });

  // 6 · call to action
  whoosh(26.0, 0.6, 1.0);
  impact(26.0, 0.9);
  [79, 84, 88, 91].forEach((n, i) => { bell(DOTS_AT + i * 0.125 + 0.18, midi(n), 0.85, 0.7); pop(DOTS_AT + i * 0.125 + 0.18, 500 + i * 140, 0.5); });
  pop(27.0, 560, 1);
  // closing chord
  impact(30.0, 1);
  [72, 76, 79, 84].forEach((n, i) => bell(30.0 + i * 0.03, midi(n), 0.7, 1.8));

  /* ---------- render → normalise → WAV ---------- */
  const buf = await ctx.startRendering();
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  let peak = 0;
  for (let i = 0; i < L.length; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const k = peak > 0 ? 0.89 / peak : 1; // −1 dBFS
  const bytes = new Uint8Array(44 + L.length * 4);
  const v = new DataView(bytes.buffer);
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF"); v.setUint32(4, 36 + L.length * 4, true); str(8, "WAVE");
  str(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true);
  v.setUint32(24, SR, true); v.setUint32(28, SR * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
  str(36, "data"); v.setUint32(40, L.length * 4, true);
  for (let i = 0, o = 44; i < L.length; i++, o += 4) {
    v.setInt16(o, Math.max(-1, Math.min(1, L[i] * k)) * 32767, true);
    v.setInt16(o + 2, Math.max(-1, Math.min(1, R[i] * k)) * 32767, true);
  }
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
