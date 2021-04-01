new Vue({
  el: '#app',
  data: {
    context1: null,
    oscillator1: null,
    gainNode1: null,
    context2: null,
    oscillator2: null,
    gainNode2: null,
    checked: null,
    f_click: true,
    f_set: true,
    tempo: 100,
    t_in: "",
    play: false,
    pi: null,
    timer: null,
    count: 0,
  },

  methods: {
    playStart() {
      if (this.tempo < 1 || this.tempo > 250) {
        this.t_in = "";
        this.tempo = 100;
        return;
      }
      var element = document.getElementById('mode_select');
      var radioNodeList = element.mode;
      var checked = radioNodeList.value;
      if (checked === "sound") {
        if (this.f_click == true) {
          this.oscillator1.start(0);
          this.oscillator2.start(0);
        }
        this.nome_sound(this.tempo);
        this.f_click = false;
        this.play = true;
      } else if (checked === "vibration") {
        this.nome_vibration(this.tempo);
        this.f_click = false;
        this.play = true;
      }
    },

    playStop() {
      this.play = false;
      clearInterval(this.timer);
      this.count = 0;
    },

    change(value) {
      if (this.tempo < 1 || this.tampo > 250) {
        return;
      }
      this.tempo = parseInt(this.tempo) + parseInt(value);
    },

    set(push) {
      if (this.f_set == true && push == 0) {
        return;
      }
      this.f_set = false;
      this.t_in += push;
      this.tempo = this.t_in
    },

    back() {
      if (this.tempo.length < 1) {
        return;
      }
      this.tempo = this.tempo.slice(0, this.tempo.length - 1);
    },

    reset() {
      this.t_in = "";
      this.tempo = 100;
    },

    nome_sound() {
      this.pi = 60 * 1000 / this.tempo;
      if (this.count == 0 || this.count % 4 == 0) {
        this.gainNode1.gain.value = 1;
        setTimeout(() => this.gainNode1.gain.value = 0, 30);
      } else {
        this.gainNode2.gain.value = 1;
        setTimeout(() => this.gainNode2.gain.value = 0, 30);
      }
      this.timer = setTimeout(() => this.nome_sound(), this.pi);
      this.count++;
    },

    nome_vibration() {
      console.log("success");
      this.pi = 60 * 1000 / this.tempo;
      navigator.vaibrate(30);
      this.timer = setTimeout(() => this.nome_vibration(), this.pi);
      this.count++;
    },
  },

  created: function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context1 = new AudioContext();
    this.oscillator1 = this.context1.createOscillator();
    this.gainNode1 = this.context1.createGain();
    this.oscillator1.frequency.value = 1200;
    this.gainNode1.gain.value = 0;
    this.oscillator1.connect(this.gainNode1);
    this.gainNode1.connect(this.context1.destination);

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context2 = new AudioContext();
    this.oscillator2 = this.context2.createOscillator();
    this.gainNode2 = this.context2.createGain();
    this.oscillator2.frequency.value = 1000;
    this.gainNode2.gain.value = 0;
    this.oscillator2.connect(this.gainNode2);
    this.gainNode2.connect(this.context2.destination);
  },
});
