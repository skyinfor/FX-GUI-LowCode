﻿// /<jscompress sourcefile="adapter.js" />
!(function(e) {
  if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = e(); } else if (typeof define === 'function' && define.amd) define([], e);
  else {
    (typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : this
    ).adapter = e();
  }
})(function() {
  return (function e(t, r, n) {
    function i(o, s) {
      if (!r[o]) {
        if (!t[o]) {
          var c = typeof require === 'function' && require;
          if (!s && c) return c(o, !0);
          if (a) return a(o, !0);
          var d = new Error("Cannot find module '" + o + "'");
          throw ((d.code = 'MODULE_NOT_FOUND'), d);
        }
        var p = (r[o] = { exports: {}});
        t[o][0].call(
          p.exports,
          function(e) {
            var r = t[o][1][e];
            return i(r || e);
          },
          p,
          p.exports,
          e,
          t,
          r,
          n
        );
      }
      return r[o].exports;
    }
    for (
      var a = typeof require === 'function' && require, o = 0;
      o < n.length;
      o++
    ) { i(n[o]); }
    return i;
  })(
    {
      1: [
        function(e, t, r) {
          'use strict';
          function n(e, t, r, n, i) {
            var a = s.writeRtpDescription(e.kind, t);
            if (
              ((a += s.writeIceParameters(
                e.iceGatherer.getLocalParameters()
              )),
              (a += s.writeDtlsParameters(
                e.dtlsTransport.getLocalParameters(),
                r === 'offer' ? 'actpass' : i || 'active'
              )),
              (a += 'a=mid:' + e.mid + '\r\n'),
              e.direction
                ? (a += 'a=' + e.direction + '\r\n')
                : e.rtpSender && e.rtpReceiver
                  ? (a += 'a=sendrecv\r\n')
                  : e.rtpSender
                    ? (a += 'a=sendonly\r\n')
                    : e.rtpReceiver
                      ? (a += 'a=recvonly\r\n')
                      : (a += 'a=inactive\r\n'),
              e.rtpSender)
            ) {
              var o =
								'msid:' +
								n.id +
								' ' +
								e.rtpSender.track.id +
								'\r\n';
              (a += 'a=' + o),
              (a +=
									'a=ssrc:' +
									e.sendEncodingParameters[0].ssrc +
									' ' +
									o),
              e.sendEncodingParameters[0].rtx &&
									((a +=
										'a=ssrc:' +
										e.sendEncodingParameters[0].rtx.ssrc +
										' ' +
										o),
									(a +=
										'a=ssrc-group:FID ' +
										e.sendEncodingParameters[0].ssrc +
										' ' +
										e.sendEncodingParameters[0].rtx.ssrc +
										'\r\n'));
            }
            return (
              (a +=
								'a=ssrc:' +
								e.sendEncodingParameters[0].ssrc +
								' cname:' +
								s.localCName +
								'\r\n'),
              e.rtpSender &&
								e.sendEncodingParameters[0].rtx &&
								(a +=
									'a=ssrc:' +
									e.sendEncodingParameters[0].rtx.ssrc +
									' cname:' +
									s.localCName +
									'\r\n'),
              a
            );
          }
          function i(e, t) {
            var r = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: []
            };
            var n = function(e, t) {
              e = parseInt(e, 10);
              for (var r = 0; r < t.length; r++) {
                if (
                  t[r].payloadType === e ||
										t[r].preferredPayloadType === e
                ) { return t[r]; }
              }
            };
            var i = function(e, t, r, i) {
              var a = n(e.parameters.apt, r);
              var o = n(t.parameters.apt, i);
              return (
                a &&
									o &&
									a.name.toLowerCase() ===
										o.name.toLowerCase()
              );
            };
            return (
              e.codecs.forEach(function(n) {
                for (var a = 0; a < t.codecs.length; a++) {
                  var o = t.codecs[a];
                  if (
                    n.name.toLowerCase() ===
											o.name.toLowerCase() &&
										n.clockRate === o.clockRate
                  ) {
                    if (
                      n.name.toLowerCase() === 'rtx' &&
											n.parameters &&
											o.parameters.apt &&
											!i(n, o, e.codecs, t.codecs)
                    ) { continue; }
                    ((o = JSON.parse(
                      JSON.stringify(o)
                    )).numChannels = Math.min(
                      n.numChannels,
                      o.numChannels
                    )),
                    r.codecs.push(o),
                    (o.rtcpFeedback =
												o.rtcpFeedback.filter(function(
												  e
												) {
												  for (
												    var t = 0;
												    t <
														n.rtcpFeedback.length;
												    t++
												  ) {
												    if (
												      n.rtcpFeedback[t]
												        .type ===
																e.type &&
															n.rtcpFeedback[t]
															  .parameter ===
																e.parameter
												    ) { return !0; }
												  }
												  return !1;
												}));
                    break;
                  }
                }
              }),
              e.headerExtensions.forEach(function(e) {
                for (
                  var n = 0;
                  n < t.headerExtensions.length;
                  n++
                ) {
                  var i = t.headerExtensions[n];
                  if (e.uri === i.uri) {
                    r.headerExtensions.push(i);
                    break;
                  }
                }
              }),
              r
            );
          }
          function a(e, t, r) {
            return (
              {
							  offer: {
							    setLocalDescription: [
							      'stable',
							      'have-local-offer'
							    ],
							    setRemoteDescription: [
							      'stable',
							      'have-remote-offer'
							    ]
							  },
							  answer: {
							    setLocalDescription: [
							      'have-remote-offer',
							      'have-local-pranswer'
							    ],
							    setRemoteDescription: [
							      'have-local-offer',
							      'have-remote-pranswer'
							    ]
							  }
              }[t][e].indexOf(r) !==
							-1
            );
          }
          function o(e, t) {
            var r = e.getRemoteCandidates().find(function(e) {
              return (
                t.foundation === e.foundation &&
								t.ip === e.ip &&
								t.port === e.port &&
								t.priority === e.priority &&
								t.protocol === e.protocol &&
								t.type === e.type
              );
            });
            return r || e.addRemoteCandidate(t), !r;
          }
          var s = e('sdp');
          t.exports = function(e, t) {
            var r = function(r) {
              var n = this;
              var i = document.createDocumentFragment();
              if (
                ([
                  'addEventListener',
                  'removeEventListener',
                  'dispatchEvent'
                ].forEach(function(e) {
                  n[e] = i[e].bind(i);
                }),
                (this.onicecandidate = null),
                (this.onaddstream = null),
                (this.ontrack = null),
                (this.onremovestream = null),
                (this.onsignalingstatechange = null),
                (this.oniceconnectionstatechange = null),
                (this.onicegatheringstatechange = null),
                (this.onnegotiationneeded = null),
                (this.ondatachannel = null),
                (this.canTrickleIceCandidates = null),
                (this.needNegotiation = !1),
                (this.localStreams = []),
                (this.remoteStreams = []),
                (this.localDescription = null),
                (this.remoteDescription = null),
                (this.signalingState = 'stable'),
                (this.iceConnectionState = 'new'),
                (this.iceGatheringState = 'new'),
                (r = JSON.parse(JSON.stringify(r || {}))),
                (this.usingBundle =
									r.bundlePolicy === 'max-bundle'),
                r.rtcpMuxPolicy === 'negotiate')
              ) {
                var a = new Error(
                  "rtcpMuxPolicy 'negotiate' is not supported"
                );
                throw ((a.name = 'NotSupportedError'), a);
              }
              switch (
                (r.rtcpMuxPolicy ||
									(r.rtcpMuxPolicy = 'require'),
                r.iceTransportPolicy)
              ) {
                case 'all':
                case 'relay':
                  break;
                default:
                  r.iceTransportPolicy = 'all';
              }
              switch (r.bundlePolicy) {
                case 'balanced':
                case 'max-compat':
                case 'max-bundle':
                  break;
                default:
                  r.bundlePolicy = 'balanced';
              }
              if (
                ((r.iceServers = (function(e, t) {
                  var r = !1;
                  return (e = JSON.parse(
                    JSON.stringify(e)
                  )).filter(function(e) {
                    if (e && (e.urls || e.url)) {
                      var n = e.urls || e.url;
                      e.url &&
												!e.urls &&
												console.warn(
												  'RTCIceServer.url is deprecated! Use urls instead.'
												);
                      var i = typeof n === 'string';
                      return (
                        i && (n = [n]),
                        (n = n.filter(function(e) {
                          return e.indexOf('turn:') !==
														0 ||
														e.indexOf(
														  'transport=udp'
														) ===
															-1 ||
														e.indexOf(
														  'turn:['
														) !==
															-1 ||
														r
                            ? e.indexOf(
                              'stun:'
                            ) ===
																0 &&
																t >= 14393 &&
																e.indexOf(
																  '?transport=udp'
																) ===
																	-1
                            : ((r = !0), !0);
                        })),
                        delete e.url,
                        (e.urls = i ? n[0] : n),
                        !!n.length
                      );
                    }
                    return !1;
                  });
                })(r.iceServers || [], t)),
                (this._iceGatherers = []),
                r.iceCandidatePoolSize)
              ) {
                for (var o = r.iceCandidatePoolSize; o > 0; o--) {
                  this._iceGatherers = new e.RTCIceGatherer({
                    iceServers: r.iceServers,
                    gatherPolicy: r.iceTransportPolicy
                  });
                }
              } else r.iceCandidatePoolSize = 0;
              (this._config = r),
              (this.transceivers = []),
              (this._sdpSessionId = s.generateSessionId()),
              (this._sdpSessionVersion = 0),
              (this._dtlsRole = void 0);
            };
            return (
              (r.prototype._emitGatheringStateChange =
								function() {
								  var e = new Event(
								    'icegatheringstatechange'
								  );
								  this.dispatchEvent(e),
								  typeof this
											  .onicegatheringstatechange ===
											'function' &&
											this.onicegatheringstatechange(e);
								}),
              (r.prototype.getConfiguration = function() {
                return this._config;
              }),
              (r.prototype.getLocalStreams = function() {
                return this.localStreams;
              }),
              (r.prototype.getRemoteStreams = function() {
                return this.remoteStreams;
              }),
              (r.prototype._createTransceiver = function(e) {
                var t = this.transceivers.length > 0;
                var r = {
                  track: null,
                  iceGatherer: null,
                  iceTransport: null,
                  dtlsTransport: null,
                  localCapabilities: null,
                  remoteCapabilities: null,
                  rtpSender: null,
                  rtpReceiver: null,
                  kind: e,
                  mid: null,
                  sendEncodingParameters: null,
                  recvEncodingParameters: null,
                  stream: null,
                  wantReceive: !0
                };
                if (this.usingBundle && t) {
                  (r.iceTransport =
										this.transceivers[0].iceTransport),
                  (r.dtlsTransport =
											this.transceivers[0].dtlsTransport);
                } else {
                  var n = this._createIceAndDtlsTransports();
                  (r.iceTransport = n.iceTransport),
                  (r.dtlsTransport = n.dtlsTransport);
                }
                return this.transceivers.push(r), r;
              }),
              (r.prototype.addTrack = function(t, r) {
                for (
                  var n, i = 0;
                  i < this.transceivers.length;
                  i++
                ) {
                  this.transceivers[i].track ||
										this.transceivers[i].kind !== t.kind ||
										(n = this.transceivers[i]);
                }
                return (
                  n || (n = this._createTransceiver(t.kind)),
                  this._maybeFireNegotiationNeeded(),
                  this.localStreams.indexOf(r) === -1 &&
										this.localStreams.push(r),
                  (n.track = t),
                  (n.stream = r),
                  (n.rtpSender = new e.RTCRtpSender(
                    t,
                    n.dtlsTransport
                  )),
                  n.rtpSender
                );
              }),
              (r.prototype.addStream = function(e) {
                var r = this;
                if (t >= 15025) {
                  e.getTracks().forEach(function(t) {
                    r.addTrack(t, e);
                  });
                } else {
                  var n = e.clone();
                  e.getTracks().forEach(function(e, t) {
                    var r = n.getTracks()[t];
                    e.addEventListener(
                      'enabled',
                      function(e) {
                        r.enabled = e.enabled;
                      }
                    );
                  }),
                  n.getTracks().forEach(function(e) {
                    r.addTrack(e, n);
                  });
                }
              }),
              (r.prototype.removeStream = function(e) {
                var t = this.localStreams.indexOf(e);
                t > -1 &&
									(this.localStreams.splice(t, 1),
									this._maybeFireNegotiationNeeded());
              }),
              (r.prototype.getSenders = function() {
                return this.transceivers
                  .filter(function(e) {
                    return !!e.rtpSender;
                  })
                  .map(function(e) {
                    return e.rtpSender;
                  });
              }),
              (r.prototype.getReceivers = function() {
                return this.transceivers
                  .filter(function(e) {
                    return !!e.rtpReceiver;
                  })
                  .map(function(e) {
                    return e.rtpReceiver;
                  });
              }),
              (r.prototype._createIceGatherer = function(t, r) {
                var n = this;
                if (r && t > 0) { return this.transceivers[0].iceGatherer; }
                if (this._iceGatherers.length) { return this._iceGatherers.shift(); }
                var i = new e.RTCIceGatherer({
                  iceServers: this._config.iceServers,
                  gatherPolicy:
										this._config.iceTransportPolicy
                });
                return (
                  Object.defineProperty(i, 'state', {
                    value: 'new',
                    writable: !0
                  }),
                  (this.transceivers[t].candidates = []),
                  (this.transceivers[t].bufferCandidates =
										function(e) {
										  var r =
												!e.candidate ||
												Object.keys(e.candidate)
												  .length ===
													0;
										  (i.state = r
										    ? 'completed'
										    : 'gathering'),
										  n.transceivers[t]
													  .candidates !==
													null &&
													n.transceivers[
													  t
													].candidates.push(
													  e.candidate
													);
										}),
                  i.addEventListener(
                    'localcandidate',
                    this.transceivers[t].bufferCandidates
                  ),
                  i
                );
              }),
              (r.prototype._gather = function(t, r) {
                var n = this;
                var i = this.transceivers[r].iceGatherer;
                if (!i.onlocalcandidate) {
                  var a = this.transceivers[r].candidates;
                  (this.transceivers[r].candidates = null),
                  i.removeEventListener(
                    'localcandidate',
                    this.transceivers[r]
                      .bufferCandidates
                  ),
                  (i.onlocalcandidate = function(e) {
                    if (!(n.usingBundle && r > 0)) {
                      var a = new Event(
                        'icecandidate'
                      );
                      a.candidate = {
                        sdpMid: t,
                        sdpMLineIndex: r
                      };
                      var o = e.candidate;
                      var c =
														!o ||
														Object.keys(o)
														  .length ===
															0;
                      c
                        ? (i.state !== 'new' &&
															i.state !==
																'gathering') ||
													  (i.state = 'completed')
                        : (i.state === 'new' &&
															(i.state =
																'gathering'),
													  (o.component = 1),
													  (a.candidate.candidate =
															s.writeCandidate(
															  o
															)));
                      var d = s.splitSections(
                        n.localDescription.sdp
                      );
                      (d[
                        a.candidate.sdpMLineIndex +
														1
                      ] += c
                        ? 'a=end-of-candidates\r\n'
                        : 'a=' +
													  a.candidate.candidate +
													  '\r\n'),
                      (n.localDescription.sdp =
														d.join(''));
                      var p = n.transceivers.every(
                        function(e) {
                          return (
                            e.iceGatherer &&
															e.iceGatherer
																  .state ===
																'completed'
                          );
                        }
                      );
                      n.iceGatheringState !==
													'gathering' &&
													((n.iceGatheringState =
														'gathering'),
													n._emitGatheringStateChange()),
                      c ||
														(n.dispatchEvent(a),
														typeof n.onicecandidate ===
															'function' &&
															n.onicecandidate(
															  a
															)),
                      p &&
														(n.dispatchEvent(
														  new Event(
														    'icecandidate'
														  )
														),
														typeof n.onicecandidate ===
															'function' &&
															n.onicecandidate(
															  new Event(
															    'icecandidate'
															  )
															),
														(n.iceGatheringState =
															'complete'),
														n._emitGatheringStateChange());
                    }
                  }),
                  e.setTimeout(function() {
                    a.forEach(function(e) {
                      var t = new Event(
                        'RTCIceGatherEvent'
                      );
                      (t.candidate = e),
                      i.onlocalcandidate(t);
                    });
                  }, 0);
                }
              }),
              (r.prototype._createIceAndDtlsTransports =
								function() {
								  var t = this;
								  var r = new e.RTCIceTransport(null);
								  r.onicestatechange = function() {
								    t._updateConnectionState();
								  };
								  var n = new e.RTCDtlsTransport(r);
								  return (
								    (n.ondtlsstatechange = function() {
								      t._updateConnectionState();
								    }),
								    (n.onerror = function() {
								      Object.defineProperty(n, 'state', {
								        value: 'failed',
								        writable: !0
								      }),
								      t._updateConnectionState();
								    }),
								    { iceTransport: r, dtlsTransport: n }
								  );
								}),
              (r.prototype._disposeIceAndDtlsTransports =
								function(e) {
								  var t = this.transceivers[e].iceGatherer;
								  t &&
										(delete t.onlocalcandidate,
										delete this.transceivers[e]
										  .iceGatherer);
								  var r = this.transceivers[e].iceTransport;
								  r &&
										(delete r.onicestatechange,
										delete this.transceivers[e]
										  .iceTransport);
								  var n = this.transceivers[e].dtlsTransport;
								  n &&
										(delete n.ondtlsstatechange,
										delete n.onerror,
										delete this.transceivers[e]
										  .dtlsTransport);
								}),
              (r.prototype._transceive = function(e, r, n) {
                var a = i(
                  e.localCapabilities,
                  e.remoteCapabilities
                );
                r &&
									e.rtpSender &&
									((a.encodings = e.sendEncodingParameters),
									(a.rtcp = {
									  cname: s.localCName,
									  compound: e.rtcpParameters.compound
									}),
									e.recvEncodingParameters.length &&
										(a.rtcp.ssrc =
											e.recvEncodingParameters[0].ssrc),
									e.rtpSender.send(a)),
                n &&
										e.rtpReceiver &&
										a.codecs.length > 0 &&
										(e.kind === 'video' &&
											e.recvEncodingParameters &&
											t < 15019 &&
											e.recvEncodingParameters.forEach(
											  function(e) {
											    delete e.rtx;
											  }
											),
										(a.encodings =
											e.recvEncodingParameters),
										(a.rtcp = {
										  cname: e.rtcpParameters.cname,
										  compound: e.rtcpParameters.compound
										}),
										e.sendEncodingParameters.length &&
											(a.rtcp.ssrc =
												e.sendEncodingParameters[0].ssrc),
										e.rtpReceiver.receive(a));
              }),
              (r.prototype.setLocalDescription = function(e) {
                var t = this;
                var r = arguments;
                if (
                  !a(
                    'setLocalDescription',
                    e.type,
                    this.signalingState
                  )
                ) {
                  return new Promise(function(n, i) {
                    var a = new Error(
                      'Can not set local ' +
												e.type +
												' in state ' +
												t.signalingState
                    );
                    (a.name = 'InvalidStateError'),
                    r.length > 2 &&
												typeof r[2] === 'function' &&
												r[2].apply(null, [a]),
                    i(a);
                  });
                }
                var n, o;
                if (e.type === 'offer') {
                  (n = s.splitSections(e.sdp)),
                  (o = n.shift()),
                  n.forEach(function(e, r) {
                    var n = s.parseRtpParameters(e);
                    t.transceivers[
                      r
                    ].localCapabilities = n;
                  }),
                  this.transceivers.forEach(function(
                    e,
                    r
                  ) {
                    t._gather(e.mid, r);
                  });
                } else if (e.type === 'answer') {
                  (n = s.splitSections(
                    t.remoteDescription.sdp
                  )),
                  (o = n.shift());
                  var c =
										s.matchPrefix(o, 'a=ice-lite').length >
										0;
                  n.forEach(function(e, r) {
                    var n = t.transceivers[r];
                    var a = n.iceGatherer;
                    var d = n.iceTransport;
                    var p = n.dtlsTransport;
                    var u = n.localCapabilities;
                    var f = n.remoteCapabilities;
                    if (
                      !(
                        s.isRejected(e) &&
												!s.matchPrefix(
												  e,
												  'a=bundle-only'
												).length ===
													1
                      ) &&
											!n.isDatachannel
                    ) {
                      var l = s.getIceParameters(e, o);
                      var m = s.getDtlsParameters(e, o);
                      c && (m.role = 'server'),
                      (t.usingBundle && r !== 0) ||
													(t._gather(n.mid, r),
													d.state === 'new' &&
														d.start(
														  a,
														  l,
														  c
														    ? 'controlling'
														    : 'controlled'
														),
													p.state === 'new' &&
														p.start(m));
                      var h = i(u, f);
                      t._transceive(
                        n,
                        h.codecs.length > 0,
                        !1
                      );
                    }
                  });
                }
                switch (
                  ((this.localDescription = {
                    type: e.type,
                    sdp: e.sdp
                  }),
                  e.type)
                ) {
                  case 'offer':
                    this._updateSignalingState(
                      'have-local-offer'
                    );
                    break;
                  case 'answer':
                    this._updateSignalingState('stable');
                    break;
                  default:
                    throw new TypeError(
                      'unsupported type "' + e.type + '"'
                    );
                }
                var d =
									arguments.length > 1 &&
									typeof arguments[1] === 'function' &&
									arguments[1];
                return new Promise(function(e) {
                  d && d.apply(null), e();
                });
              }),
              (r.prototype.setRemoteDescription = function(r) {
                var n = this;
                var i = arguments;
                if (
                  !a(
                    'setRemoteDescription',
                    r.type,
                    this.signalingState
                  )
                ) {
                  return new Promise(function(e, t) {
                    var a = new Error(
                      'Can not set remote ' +
												r.type +
												' in state ' +
												n.signalingState
                    );
                    (a.name = 'InvalidStateError'),
                    i.length > 2 &&
												typeof i[2] === 'function' &&
												i[2].apply(null, [a]),
                    t(a);
                  });
                }
                var c = {};
                this.remoteStreams.forEach(function(e) {
                  c[e.id] = e;
                });
                var d = [];
                var p = s.splitSections(r.sdp);
                var u = p.shift();
                var f =
										s.matchPrefix(u, 'a=ice-lite').length >
										0;
                var l =
										s.matchPrefix(u, 'a=group:BUNDLE ')
										  .length > 0;
                this.usingBundle = l;
                var m = s.matchPrefix(u, 'a=ice-options:')[0];
                switch (
                  ((this.canTrickleIceCandidates =
										!!m &&
										m
										  .substr(14)
										  .split(' ')
										  .indexOf('trickle') >= 0),
                  p.forEach(function(i, a) {
                    var p = s.splitLines(i);
                    var m = s.getKind(i);
                    var h =
												s.isRejected(i) &&
												!s.matchPrefix(
												  i,
												  'a=bundle-only'
												).length ===
													1;
                    var v = p[0].substr(2).split(' ')[2];
                    var g = s.getDirection(i, u);
                    var y = s.parseMsid(i);
                    var C =
												s.getMid(i) ||
												s.generateIdentifier();
                    if (
                      m !== 'application' ||
											v !== 'DTLS/SCTP'
                    ) {
                      var T;
                      var S;
                      var P;
                      var R;
                      var b;
                      var E;
                      var w;
                      var k;
                      var _;
                      var x;
                      var O;
                      var D = s.parseRtpParameters(i);
                      h ||
												((x = s.getIceParameters(i, u)),
												((O = s.getDtlsParameters(
												  i,
												  u
												)).role = 'client')),
                      (w =
													s.parseRtpEncodingParameters(
													  i
													));
                      var M = s.parseRtcpParameters(i);
                      var I =
													s.matchPrefix(
													  i,
													  'a=end-of-candidates',
													  u
													).length > 0;
                      var j = s
                        .matchPrefix(
                          i,
                          'a=candidate:'
                        )
                        .map(function(e) {
                          return s.parseCandidate(
                            e
                          );
                        })
                        .filter(function(e) {
                          return (
                            e.component === 1
                          );
                        });
                      if (
                        ((r.type === 'offer' ||
													r.type === 'answer') &&
													!h &&
													l &&
													a > 0 &&
													n.transceivers[a] &&
													(n._disposeIceAndDtlsTransports(
													  a
													),
													(n.transceivers[
													  a
													].iceGatherer =
														n.transceivers[0].iceGatherer),
													(n.transceivers[
													  a
													].iceTransport =
														n.transceivers[0].iceTransport),
													(n.transceivers[
													  a
													].dtlsTransport =
														n.transceivers[0].dtlsTransport),
													n.transceivers[a]
													  .rtpSender &&
														n.transceivers[
														  a
														].rtpSender.setTransport(
														  n.transceivers[0]
														    .dtlsTransport
														),
													n.transceivers[a]
													  .rtpReceiver &&
														n.transceivers[
														  a
														].rtpReceiver.setTransport(
														  n.transceivers[0]
														    .dtlsTransport
														)),
                        r.type !== 'offer' || h)
                      ) {
                        r.type !== 'answer' ||
													h ||
													((S = (T =
														n.transceivers[a])
													  .iceGatherer),
													(P = T.iceTransport),
													(R = T.dtlsTransport),
													(b = T.rtpReceiver),
													(E =
														T.sendEncodingParameters),
													(k = T.localCapabilities),
													(n.transceivers[
													  a
													].recvEncodingParameters =
														w),
													(n.transceivers[
													  a
													].remoteCapabilities = D),
													(n.transceivers[
													  a
													].rtcpParameters = M),
													j.length &&
														P.state === 'new' &&
														((!f && !I) ||
														(l && a !== 0)
														  ? j.forEach(
														    function(
														      e
														    ) {
														      o(
														        T.iceTransport,
														        e
														      );
														    }
															  )
														  : P.setRemoteCandidates(
														    j
															  )),
													(l && a !== 0) ||
														(P.state === 'new' &&
															P.start(
															  S,
															  x,
															  'controlling'
															),
														R.state === 'new' &&
															R.start(O)),
													n._transceive(
													  T,
													  g === 'sendrecv' ||
															g === 'recvonly',
													  g === 'sendrecv' ||
															g === 'sendonly'
													),
													!b ||
													(g !== 'sendrecv' &&
														g !== 'sendonly')
													  ? delete T.rtpReceiver
													  : ((_ = b.track),
														  y
													    ? (c[
													      y.stream
																  ] ||
																		(c[
																		  y.stream
																		] = new e.MediaStream()),
																  c[
													      y.stream
																  ].addTrack(_),
																  d.push([
													      _,
													      b,
													      c[
													        y
													          .stream
													      ]
																  ]))
													    : (c.default ||
																		(c.default =
																			new e.MediaStream()),
																  c.default.addTrack(
													      _
																  ),
																  d.push([
													      _,
													      b,
													      c.default
																  ]))));
                      } else {
                        ((T =
													n.transceivers[a] ||
													n._createTransceiver(
													  m
													)).mid = C),
                        T.iceGatherer ||
														(T.iceGatherer =
															n._createIceGatherer(
															  a,
															  l
															)),
                        j.length &&
														T.iceTransport
															  .state ===
															'new' &&
														(!I || (l && a !== 0)
														  ? j.forEach(
														    function(
														      e
														    ) {
														      o(
														        T.iceTransport,
														        e
														      );
														    }
															  )
														  : T.iceTransport.setRemoteCandidates(
														    j
															  )),
                        (k =
														e.RTCRtpReceiver.getCapabilities(
														  m
														)),
                        t < 15019 &&
														(k.codecs =
															k.codecs.filter(
															  function(e) {
															    return (
															      e.name !==
																		'rtx'
															    );
															  }
															)),
                        (E =
														T.sendEncodingParameters || [
														  {
														    ssrc:
																	1001 *
																	(2 * a + 2)
														  }
														]);
                        var L = !1;
                        if (
                          (g === 'sendrecv' ||
														g === 'sendonly') &&
													((L = !T.rtpReceiver),
													(b =
														T.rtpReceiver ||
														new e.RTCRtpReceiver(
														  T.dtlsTransport,
														  m
														)),
													L)
                        ) {
                          var U;
                          (_ = b.track),
                          y
                            ? (c[y.stream] ||
																	((c[
																	  y.stream
																	] = new e.MediaStream()),
																	Object.defineProperty(
																	  c[
																	    y
																	      .stream
																	  ],
																	  'id',
																	  {
																	    get: function() {
																	      return y.stream;
																	    }
																	  }
																	)),
															  Object.defineProperty(
                              _,
                              'id',
                              {
                                get: function() {
                                  return y.track;
                                }
                              }
															  ),
															  (U = c[y.stream]))
                            : (c.default ||
																	(c.default =
																		new e.MediaStream()),
															  (U = c.default)),
                          U.addTrack(_),
                          d.push([_, b, U]);
                        }
                        (T.localCapabilities = k),
                        (T.remoteCapabilities = D),
                        (T.rtpReceiver = b),
                        (T.rtcpParameters = M),
                        (T.sendEncodingParameters =
														E),
                        (T.recvEncodingParameters =
														w),
                        n._transceive(
                          n.transceivers[a],
                          !1,
                          L
                        );
                      }
                    } else n.transceivers[a] = { mid: C, isDatachannel: !0 };
                  }),
                  void 0 === this._dtlsRole &&
										(this._dtlsRole =
											r.type === 'offer'
											  ? 'active'
											  : 'passive'),
                  (this.remoteDescription = {
                    type: r.type,
                    sdp: r.sdp
                  }),
                  r.type)
                ) {
                  case 'offer':
                    this._updateSignalingState(
                      'have-remote-offer'
                    );
                    break;
                  case 'answer':
                    this._updateSignalingState('stable');
                    break;
                  default:
                    throw new TypeError(
                      'unsupported type "' + r.type + '"'
                    );
                }
                return (
                  Object.keys(c).forEach(function(t) {
                    var r = c[t];
                    if (r.getTracks().length) {
                      if (
                        n.remoteStreams.indexOf(r) ===
												-1
                      ) {
                        n.remoteStreams.push(r);
                        var i = new Event('addstream');
                        (i.stream = r),
                        e.setTimeout(function() {
                          n.dispatchEvent(i),
                          typeof n.onaddstream ===
																'function' &&
																n.onaddstream(
																  i
																);
                        });
                      }
                      d.forEach(function(t) {
                        var i = t[0];
                        var a = t[1];
                        if (r.id === t[2].id) {
                          var o = new Event('track');
                          (o.track = i),
                          (o.receiver = a),
                          (o.transceiver = {
                            receiver: a
                          }),
                          (o.streams = [r]),
                          e.setTimeout(
                            function() {
                              n.dispatchEvent(
                                o
                              ),
                              typeof n.ontrack ===
																		'function' &&
																		n.ontrack(
																		  o
																		);
                            }
                          );
                        }
                      });
                    }
                  }),
                  e.setTimeout(function() {
                    n &&
											n.transceivers &&
											n.transceivers.forEach(function(
											  e
											) {
											  e.iceTransport &&
													e.iceTransport.state ===
														'new' &&
													e.iceTransport.getRemoteCandidates()
													  .length > 0 &&
													(console.warn(
													  'Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification'
													),
													e.iceTransport.addRemoteCandidate(
													  {}
													));
											});
                  }, 4e3),
                  new Promise(function(e) {
                    i.length > 1 &&
											typeof i[1] === 'function' &&
											i[1].apply(null),
                    e();
                  })
                );
              }),
              (r.prototype.close = function() {
                this.transceivers.forEach(function(e) {
                  e.iceTransport && e.iceTransport.stop(),
                  e.dtlsTransport &&
											e.dtlsTransport.stop(),
                  e.rtpSender && e.rtpSender.stop(),
                  e.rtpReceiver && e.rtpReceiver.stop();
                }),
                this._updateSignalingState('closed');
              }),
              (r.prototype._updateSignalingState = function(e) {
                this.signalingState = e;
                var t = new Event('signalingstatechange');
                this.dispatchEvent(t),
                typeof this.onsignalingstatechange ===
										'function' &&
										this.onsignalingstatechange(t);
              }),
              (r.prototype._maybeFireNegotiationNeeded =
								function() {
								  var t = this;
								  this.signalingState === 'stable' &&
										!0 !== this.needNegotiation &&
										((this.needNegotiation = !0),
										e.setTimeout(function() {
										  if (!1 !== t.needNegotiation) {
										    t.needNegotiation = !1;
										    var e = new Event(
										      'negotiationneeded'
										    );
										    t.dispatchEvent(e),
										    typeof t.onnegotiationneeded ===
														'function' &&
														t.onnegotiationneeded(
														  e
														);
										  }
										}, 0));
								}),
              (r.prototype._updateConnectionState = function() {
                var e;
                var t = {
                  new: 0,
                  closed: 0,
                  connecting: 0,
                  checking: 0,
                  connected: 0,
                  completed: 0,
                  disconnected: 0,
                  failed: 0
                };
                if (
                  (this.transceivers.forEach(function(e) {
                    t[e.iceTransport.state]++,
                    t[e.dtlsTransport.state]++;
                  }),
                  (t.connected += t.completed),
                  (e = 'new'),
                  t.failed > 0
                    ? (e = 'failed')
                    : t.connecting > 0 || t.checking > 0
                      ? (e = 'connecting')
                      : t.disconnected > 0
                        ? (e = 'disconnected')
                        : t.new > 0
                          ? (e = 'new')
                          : (t.connected > 0 ||
												t.completed > 0) &&
										  (e = 'connected'),
                  e !== this.iceConnectionState)
                ) {
                  this.iceConnectionState = e;
                  var r = new Event(
                    'iceconnectionstatechange'
                  );
                  this.dispatchEvent(r),
                  typeof this
											  .oniceconnectionstatechange ===
											'function' &&
											this.oniceconnectionstatechange(r);
                }
              }),
              (r.prototype.createOffer = function() {
                var r;
                var i = this;
                var a = arguments;
                arguments.length === 1 &&
								typeof arguments[0] !== 'function'
                  ? (r = arguments[0])
                  : arguments.length === 3 &&
									  (r = arguments[2]);
                var o = this.transceivers.filter(function(e) {
                  return e.kind === 'audio';
                }).length;
                var c = this.transceivers.filter(function(e) {
                  return e.kind === 'video';
                }).length;
                if (r) {
                  if (r.mandatory || r.optional) {
                    throw new TypeError(
                      'Legacy mandatory/optional constraints not supported.'
                    );
                  }
                  void 0 !== r.offerToReceiveAudio &&
										(o =
											!0 === r.offerToReceiveAudio
											  ? 1
											  : !1 === r.offerToReceiveAudio
											    ? 0
											    : r.offerToReceiveAudio),
                  void 0 !== r.offerToReceiveVideo &&
											(c =
												!0 === r.offerToReceiveVideo
												  ? 1
												  : !1 ===
													  r.offerToReceiveVideo
												    ? 0
												    : r.offerToReceiveVideo);
                }
                for (
                  this.transceivers.forEach(function(e) {
                    e.kind === 'audio'
                      ? --o < 0 && (e.wantReceive = !1)
                      : e.kind === 'video' &&
											  --c < 0 &&
											  (e.wantReceive = !1);
                  });
                  o > 0 || c > 0;

                ) {
                  o > 0 &&
										(this._createTransceiver('audio'), o--),
                  c > 0 &&
											(this._createTransceiver('video'),
											c--);
                }
                var d = s.writeSessionBoilerplate(
                  this._sdpSessionId,
                  this._sdpSessionVersion++
                );
                this.transceivers.forEach(function(r, n) {
                  var a = r.track;
                  var o = r.kind;
                  var c = s.generateIdentifier();
                  (r.mid = c),
                  r.iceGatherer ||
											(r.iceGatherer =
												i._createIceGatherer(
												  n,
												  i.usingBundle
												));
                  var d = e.RTCRtpSender.getCapabilities(o);
                  t < 15019 &&
										(d.codecs = d.codecs.filter(function(
										  e
										) {
										  return e.name !== 'rtx';
										})),
                  d.codecs.forEach(function(e) {
                    e.name === 'H264' &&
												void 0 ===
													e.parameters[
													  'level-asymmetry-allowed'
													] &&
												(e.parameters[
												  'level-asymmetry-allowed'
												] = '1');
                  });
                  var p = r.sendEncodingParameters || [
                    { ssrc: 1001 * (2 * n + 1) }
                  ];
                  a &&
										t >= 15019 &&
										o === 'video' &&
										!p[0].rtx &&
										(p[0].rtx = { ssrc: p[0].ssrc + 1 }),
                  r.wantReceive &&
											(r.rtpReceiver =
												new e.RTCRtpReceiver(
												  r.dtlsTransport,
												  o
												)),
                  (r.localCapabilities = d),
                  (r.sendEncodingParameters = p);
                }),
                this._config.bundlePolicy !==
										'max-compat' &&
										(d +=
											'a=group:BUNDLE ' +
											this.transceivers
											  .map(function(e) {
											    return e.mid;
											  })
											  .join(' ') +
											'\r\n'),
                (d += 'a=ice-options:trickle\r\n'),
                this.transceivers.forEach(function(e, t) {
                  (d += n(
                    e,
                    e.localCapabilities,
                    'offer',
                    e.stream,
                    i._dtlsRole
                  )),
                  (d += 'a=rtcp-rsize\r\n'),
                  !e.iceGatherer ||
												i.iceGatheringState === 'new' ||
												(t !== 0 && i.usingBundle) ||
												(e.iceGatherer
												  .getLocalCandidates()
												  .forEach(function(e) {
												    (e.component = 1),
												    (d +=
																'a=' +
																s.writeCandidate(
																  e
																) +
																'\r\n');
												  }),
												e.iceGatherer.state ===
													'completed' &&
													(d +=
														'a=end-of-candidates\r\n'));
                });
                var p = new e.RTCSessionDescription({
                  type: 'offer',
                  sdp: d
                });
                return new Promise(function(e) {
                  if (
                    a.length > 0 &&
										typeof a[0] === 'function'
                  ) { return a[0].apply(null, [p]), void e(); }
                  e(p);
                });
              }),
              (r.prototype.createAnswer = function() {
                var r = this;
                var a = arguments;
                var o = s.writeSessionBoilerplate(
                  this._sdpSessionId,
                  this._sdpSessionVersion++
                );
                this.usingBundle &&
									(o +=
										'a=group:BUNDLE ' +
										this.transceivers
										  .map(function(e) {
										    return e.mid;
										  })
										  .join(' ') +
										'\r\n');
                var c =
									s.splitSections(this.remoteDescription.sdp)
									  .length - 1;
                this.transceivers.forEach(function(e, a) {
                  if (!(a + 1 > c)) {
                    if (e.isDatachannel) {
                      o +=
												'm=application 0 DTLS/SCTP 5000\r\nc=IN IP4 0.0.0.0\r\na=mid:' +
												e.mid +
												'\r\n';
                    } else {
                      if (e.stream) {
                        var s;
                        e.kind === 'audio'
                          ? (s =
															e.stream.getAudioTracks()[0])
                          : e.kind === 'video' &&
													  (s =
															e.stream.getVideoTracks()[0]),
                        s &&
														t >= 15019 &&
														e.kind === 'video' &&
														!e
														  .sendEncodingParameters[0]
														  .rtx &&
														(e.sendEncodingParameters[0].rtx =
															{
															  ssrc:
																	e
																	  .sendEncodingParameters[0]
																	  .ssrc +
																	1
															});
                      }
                      var d = i(
                        e.localCapabilities,
                        e.remoteCapabilities
                      );
                      !d.codecs.filter(function(e) {
                        return (
                          e.name.toLowerCase() ===
													'rtx'
                        );
                      }).length &&
												e.sendEncodingParameters[0]
												  .rtx &&
												delete e
												  .sendEncodingParameters[0]
												  .rtx,
                      (o += n(
                        e,
                        d,
                        'answer',
                        e.stream,
                        r._dtlsRole
                      )),
                      e.rtcpParameters &&
													e.rtcpParameters
													  .reducedSize &&
													(o += 'a=rtcp-rsize\r\n');
                    }
                  }
                });
                var d = new e.RTCSessionDescription({
                  type: 'answer',
                  sdp: o
                });
                return new Promise(function(e) {
                  if (
                    a.length > 0 &&
										typeof a[0] === 'function'
                  ) { return a[0].apply(null, [d]), void e(); }
                  e(d);
                });
              }),
              (r.prototype.addIceCandidate = function(e) {
                var t, r;
                if (e && e.candidate !== '') {
                  if (void 0 === e.sdpMLineIndex && !e.sdpMid) {
                    throw new TypeError(
                      'sdpMLineIndex or sdpMid required'
                    );
                  }
                  if (this.remoteDescription) {
                    var n = e.sdpMLineIndex;
                    if (e.sdpMid) {
                      for (
                        var i = 0;
                        i < this.transceivers.length;
                        i++
                      ) {
                        if (
                          this.transceivers[i].mid ===
													e.sdpMid
                        ) {
                          n = i;
                          break;
                        }
                      }
                    }
                    var a = this.transceivers[n];
                    if (a) {
                      if (a.isDatachannel) { return Promise.resolve(); }
                      var c =
												Object.keys(e.candidate)
												  .length > 0
												  ? s.parseCandidate(
												    e.candidate
													  )
												  : {};
                      if (
                        c.protocol === 'tcp' &&
												(c.port === 0 || c.port === 9)
                      ) { return Promise.resolve(); }
                      if (
                        c.component &&
												c.component !== 1
                      ) { return Promise.resolve(); }
                      if (
                        ((n === 0 ||
													(n > 0 &&
														a.iceTransport !==
															this.transceivers[0]
															  .iceTransport)) &&
													(o(a.iceTransport, c) ||
														((t = new Error(
														  'Can not add ICE candidate'
														)).name =
															'OperationError')),
                        !t)
                      ) {
                        var d = e.candidate.trim();
                        d.indexOf('a=') === 0 &&
													(d = d.substr(2)),
                        ((r = s.splitSections(
                          this.remoteDescription
                            .sdp
                        ))[n + 1] +=
														'a=' +
														(c.type
														  ? d
														  : 'end-of-candidates') +
														'\r\n'),
                        (this.remoteDescription.sdp =
														r.join(''));
                      }
                    } else {
                      (t = new Error(
                        'Can not add ICE candidate'
                      )).name = 'OperationError';
                    }
                  } else {
                    (t = new Error(
                      'Can not add ICE candidate without a remote description'
                    )).name = 'InvalidStateError';
                  }
                } else {
                  for (
                    var p = 0;
                    p < this.transceivers.length &&
										(this.transceivers[p].isDatachannel ||
											(this.transceivers[
											  p
											].iceTransport.addRemoteCandidate(
											  {}
											),
											(r = s.splitSections(
											  this.remoteDescription.sdp
											)),
											(r[p + 1] +=
												'a=end-of-candidates\r\n'),
											(this.remoteDescription.sdp =
												r.join('')),
											!this.usingBundle));
                    p++
                  );
                }
                var u = arguments;
                return new Promise(function(e, r) {
                  t
                    ? (u.length > 2 &&
												typeof u[2] === 'function' &&
												u[2].apply(null, [t]),
										  r(t))
                    : (u.length > 1 &&
												typeof u[1] === 'function' &&
												u[1].apply(null),
										  e());
                });
              }),
              (r.prototype.getStats = function() {
                var e = [];
                this.transceivers.forEach(function(t) {
                  [
                    'rtpSender',
                    'rtpReceiver',
                    'iceGatherer',
                    'iceTransport',
                    'dtlsTransport'
                  ].forEach(function(r) {
                    t[r] && e.push(t[r].getStats());
                  });
                });
                var t =
									arguments.length > 1 &&
									typeof arguments[1] === 'function' &&
									arguments[1];
                return new Promise(function(r) {
                  var n = new Map();
                  Promise.all(e).then(function(e) {
                    e.forEach(function(e) {
                      Object.keys(e).forEach(function(
                        t
                      ) {
                        (e[t].type = (function(e) {
                          return (
                            {
                              inboundrtp:
																'inbound-rtp',
                              outboundrtp:
																'outbound-rtp',
                              candidatepair:
																'candidate-pair',
                              localcandidate:
																'local-candidate',
                              remotecandidate:
																'remote-candidate'
                            }[e.type] || e.type
                          );
                        })(e[t])),
                        n.set(t, e[t]);
                      });
                    }),
                    t && t.apply(null, n),
                    r(n);
                  });
                });
              }),
              r
            );
          };
        },
        { sdp: 2 }
      ],
      2: [
        function(e, t, r) {
          'use strict';
          var n = {};
          (n.generateIdentifier = function() {
            return Math.random().toString(36).substr(2, 10);
          }),
          (n.localCName = n.generateIdentifier()),
          (n.splitLines = function(e) {
            return e
              .trim()
              .split('\n')
              .map(function(e) {
                return e.trim();
              });
          }),
          (n.splitSections = function(e) {
            return e.split('\nm=').map(function(e, t) {
              return (t > 0 ? 'm=' + e : e).trim() + '\r\n';
            });
          }),
          (n.matchPrefix = function(e, t) {
            return n.splitLines(e).filter(function(e) {
              return e.indexOf(t) === 0;
            });
          }),
          (n.parseCandidate = function(e) {
            for (
              var t,
                r = {
                  foundation: (t =
											e.indexOf('a=candidate:') === 0
											  ? e.substring(12).split(' ')
											  : e
											    .substring(10)
											    .split(' '))[0],
                  component: parseInt(t[1], 10),
                  protocol: t[2].toLowerCase(),
                  priority: parseInt(t[3], 10),
                  ip: t[4],
                  port: parseInt(t[5], 10),
                  type: t[7]
                },
                n = 8;
              n < t.length;
              n += 2
            ) {
              switch (t[n]) {
                case 'raddr':
                  r.relatedAddress = t[n + 1];
                  break;
                case 'rport':
                  r.relatedPort = parseInt(t[n + 1], 10);
                  break;
                case 'tcptype':
                  r.tcpType = t[n + 1];
                  break;
                case 'ufrag':
                  (r.ufrag = t[n + 1]),
                  (r.usernameFragment = t[n + 1]);
                  break;
                default:
                  r[t[n]] = t[n + 1];
              }
            }
            return r;
          }),
          (n.writeCandidate = function(e) {
            var t = [];
            t.push(e.foundation),
            t.push(e.component),
            t.push(e.protocol.toUpperCase()),
            t.push(e.priority),
            t.push(e.ip),
            t.push(e.port);
            var r = e.type;
            return (
              t.push('typ'),
              t.push(r),
              r !== 'host' &&
									e.relatedAddress &&
									e.relatedPort &&
									(t.push('raddr'),
									t.push(e.relatedAddress),
									t.push('rport'),
									t.push(e.relatedPort)),
              e.tcpType &&
									e.protocol.toLowerCase() === 'tcp' &&
									(t.push('tcptype'), t.push(e.tcpType)),
              e.ufrag && (t.push('ufrag'), t.push(e.ufrag)),
              'candidate:' + t.join(' ')
            );
          }),
          (n.parseIceOptions = function(e) {
            return e.substr(14).split(' ');
          }),
          (n.parseRtpMap = function(e) {
            var t = e.substr(9).split(' ');
            var r = { payloadType: parseInt(t.shift(), 10) };
            return (
              (t = t[0].split('/')),
              (r.name = t[0]),
              (r.clockRate = parseInt(t[1], 10)),
              (r.numChannels =
									t.length === 3 ? parseInt(t[2], 10) : 1),
              r
            );
          }),
          (n.writeRtpMap = function(e) {
            var t = e.payloadType;
            return (
              void 0 !== e.preferredPayloadType &&
									(t = e.preferredPayloadType),
              'a=rtpmap:' +
									t +
									' ' +
									e.name +
									'/' +
									e.clockRate +
									(e.numChannels !== 1
									  ? '/' + e.numChannels
									  : '') +
									'\r\n'
            );
          }),
          (n.parseExtmap = function(e) {
            var t = e.substr(9).split(' ');
            return {
              id: parseInt(t[0], 10),
              direction:
									t[0].indexOf('/') > 0
									  ? t[0].split('/')[1]
									  : 'sendrecv',
              uri: t[1]
            };
          }),
          (n.writeExtmap = function(e) {
            return (
              'a=extmap:' +
								(e.id || e.preferredId) +
								(e.direction && e.direction !== 'sendrecv'
								  ? '/' + e.direction
								  : '') +
								' ' +
								e.uri +
								'\r\n'
            );
          }),
          (n.parseFmtp = function(e) {
            for (
              var t,
                r = {},
                n = e.substr(e.indexOf(' ') + 1).split(';'),
                i = 0;
              i < n.length;
              i++
            ) {
              r[(t = n[i].trim().split('='))[0].trim()] =
									t[1];
            }
            return r;
          }),
          (n.writeFmtp = function(e) {
            var t = '';
            var r = e.payloadType;
            if (
              (void 0 !== e.preferredPayloadType &&
									(r = e.preferredPayloadType),
              e.parameters &&
									Object.keys(e.parameters).length)
            ) {
              var n = [];
              Object.keys(e.parameters).forEach(function(t) {
                n.push(t + '=' + e.parameters[t]);
              }),
              (t +=
										'a=fmtp:' +
										r +
										' ' +
										n.join(';') +
										'\r\n');
            }
            return t;
          }),
          (n.parseRtcpFb = function(e) {
            var t = e.substr(e.indexOf(' ') + 1).split(' ');
            return { type: t.shift(), parameter: t.join(' ') };
          }),
          (n.writeRtcpFb = function(e) {
            var t = '';
            var r = e.payloadType;
            return (
              void 0 !== e.preferredPayloadType &&
									(r = e.preferredPayloadType),
              e.rtcpFeedback &&
									e.rtcpFeedback.length &&
									e.rtcpFeedback.forEach(function(e) {
									  t +=
											'a=rtcp-fb:' +
											r +
											' ' +
											e.type +
											(e.parameter && e.parameter.length
											  ? ' ' + e.parameter
											  : '') +
											'\r\n';
									}),
              t
            );
          }),
          (n.parseSsrcMedia = function(e) {
            var t = e.indexOf(' ');
            var r = { ssrc: parseInt(e.substr(7, t - 7), 10) };
            var n = e.indexOf(':', t);
            return (
              n > -1
                ? ((r.attribute = e.substr(
                  t + 1,
                  n - t - 1
									  )),
									  (r.value = e.substr(n + 1)))
                : (r.attribute = e.substr(t + 1)),
              r
            );
          }),
          (n.getMid = function(e) {
            var t = n.matchPrefix(e, 'a=mid:')[0];
            if (t) return t.substr(6);
          }),
          (n.parseFingerprint = function(e) {
            var t = e.substr(14).split(' ');
            return {
              algorithm: t[0].toLowerCase(),
              value: t[1]
            };
          }),
          (n.getDtlsParameters = function(e, t) {
            return {
              role: 'auto',
              fingerprints: n
                .matchPrefix(e + t, 'a=fingerprint:')
                .map(n.parseFingerprint)
            };
          }),
          (n.writeDtlsParameters = function(e, t) {
            var r = 'a=setup:' + t + '\r\n';
            return (
              e.fingerprints.forEach(function(e) {
                r +=
										'a=fingerprint:' +
										e.algorithm +
										' ' +
										e.value +
										'\r\n';
              }),
              r
            );
          }),
          (n.getIceParameters = function(e, t) {
            var r = n.splitLines(e);
            return {
              usernameFragment: (r = r.concat(
                n.splitLines(t)
              ))
                .filter(function(e) {
                  return e.indexOf('a=ice-ufrag:') === 0;
                })[0]
                .substr(12),
              password: r
                .filter(function(e) {
                  return e.indexOf('a=ice-pwd:') === 0;
                })[0]
                .substr(10)
            };
          }),
          (n.writeIceParameters = function(e) {
            return (
              'a=ice-ufrag:' +
								e.usernameFragment +
								'\r\na=ice-pwd:' +
								e.password +
								'\r\n'
            );
          }),
          (n.parseRtpParameters = function(e) {
            for (
              var t = {
                  codecs: [],
                  headerExtensions: [],
                  fecMechanisms: [],
                  rtcp: []
                },
                r = n.splitLines(e)[0].split(' '),
                i = 3;
              i < r.length;
              i++
            ) {
              var a = r[i];
              var o = n.matchPrefix(
                e,
                'a=rtpmap:' + a + ' '
              )[0];
              if (o) {
                var s = n.parseRtpMap(o);
                var c = n.matchPrefix(
                  e,
                  'a=fmtp:' + a + ' '
                );
                switch (
                  ((s.parameters = c.length
                    ? n.parseFmtp(c[0])
                    : {}),
                  (s.rtcpFeedback = n
                    .matchPrefix(
                      e,
                      'a=rtcp-fb:' + a + ' '
                    )
                    .map(n.parseRtcpFb)),
                  t.codecs.push(s),
                  s.name.toUpperCase())
                ) {
                  case 'RED':
                  case 'ULPFEC':
                    t.fecMechanisms.push(
                      s.name.toUpperCase()
                    );
                }
              }
            }
            return (
              n
                .matchPrefix(e, 'a=extmap:')
                .forEach(function(e) {
                  t.headerExtensions.push(
                    n.parseExtmap(e)
                  );
                }),
              t
            );
          }),
          (n.writeRtpDescription = function(e, t) {
            var r = '';
            (r += 'm=' + e + ' '),
            (r += t.codecs.length > 0 ? '9' : '0'),
            (r += ' UDP/TLS/RTP/SAVPF '),
            (r +=
									t.codecs
									  .map(function(e) {
									    return void 0 !==
												e.preferredPayloadType
									      ? e.preferredPayloadType
									      : e.payloadType;
									  })
									  .join(' ') + '\r\n'),
            (r += 'c=IN IP4 0.0.0.0\r\n'),
            (r += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
            t.codecs.forEach(function(e) {
              (r += n.writeRtpMap(e)),
              (r += n.writeFmtp(e)),
              (r += n.writeRtcpFb(e));
            });
            var i = 0;
            return (
              t.codecs.forEach(function(e) {
                e.maxptime > i && (i = e.maxptime);
              }),
              i > 0 && (r += 'a=maxptime:' + i + '\r\n'),
              (r += 'a=rtcp-mux\r\n'),
              t.headerExtensions.forEach(function(e) {
                r += n.writeExtmap(e);
              }),
              r
            );
          }),
          (n.parseRtpEncodingParameters = function(e) {
            var t;
            var r = [];
            var i = n.parseRtpParameters(e);
            var a = i.fecMechanisms.indexOf('RED') !== -1;
            var o = i.fecMechanisms.indexOf('ULPFEC') !== -1;
            var s = n
              .matchPrefix(e, 'a=ssrc:')
              .map(function(e) {
                return n.parseSsrcMedia(e);
              })
              .filter(function(e) {
                return e.attribute === 'cname';
              });
            var c = s.length > 0 && s[0].ssrc;
            var d = n
              .matchPrefix(e, 'a=ssrc-group:FID')
              .map(function(e) {
                var t = e.split(' ');
                return (
                  t.shift(),
                  t.map(function(e) {
                    return parseInt(e, 10);
                  })
                );
              });
            d.length > 0 &&
								d[0].length > 1 &&
								d[0][0] === c &&
								(t = d[0][1]),
            i.codecs.forEach(function(e) {
              if (
                e.name.toUpperCase() === 'RTX' &&
										e.parameters.apt
              ) {
                var n = {
                  ssrc: c,
                  codecPayloadType: parseInt(
                    e.parameters.apt,
                    10
                  ),
                  rtx: { ssrc: t }
                };
                r.push(n),
                a &&
												(((n = JSON.parse(
												  JSON.stringify(n)
												)).fec = {
												  ssrc: t,
												  mechanism: o
												    ? 'red+ulpfec'
												    : 'red'
												}),
												r.push(n));
              }
            }),
            r.length === 0 && c && r.push({ ssrc: c });
            var p = n.matchPrefix(e, 'b=');
            return (
              p.length &&
									((p =
										p[0].indexOf('b=TIAS:') === 0
										  ? parseInt(p[0].substr(7), 10)
										  : p[0].indexOf('b=AS:') === 0
										    ? 1e3 *
													parseInt(
													  p[0].substr(5),
													  10
													) *
													0.95 -
											  16e3
										    : void 0),
									r.forEach(function(e) {
									  e.maxBitrate = p;
									})),
              r
            );
          }),
          (n.parseRtcpParameters = function(e) {
            var t = {};
            var r = n
              .matchPrefix(e, 'a=ssrc:')
              .map(function(e) {
                return n.parseSsrcMedia(e);
              })
              .filter(function(e) {
                return e.attribute === 'cname';
              })[0];
            r && ((t.cname = r.value), (t.ssrc = r.ssrc));
            var i = n.matchPrefix(e, 'a=rtcp-rsize');
            (t.reducedSize = i.length > 0),
            (t.compound = i.length === 0);
            var a = n.matchPrefix(e, 'a=rtcp-mux');
            return (t.mux = a.length > 0), t;
          }),
          (n.parseMsid = function(e) {
            var t;
            var r = n.matchPrefix(e, 'a=msid:');
            if (r.length === 1) {
              return (
                (t = r[0].substr(7).split(' ')),
                { stream: t[0], track: t[1] }
              );
            }
            var i = n
              .matchPrefix(e, 'a=ssrc:')
              .map(function(e) {
                return n.parseSsrcMedia(e);
              })
              .filter(function(e) {
                return e.attribute === 'msid';
              });
            return i.length > 0
              ? ((t = i[0].value.split(' ')),
								  { stream: t[0], track: t[1] })
              : void 0;
          }),
          (n.generateSessionId = function() {
            return Math.random().toString().substr(2, 21);
          }),
          (n.writeSessionBoilerplate = function(e, t) {
            var r = void 0 !== t ? t : 2;
            return (
              'v=0\r\no=thisisadapterortc ' +
								(e || n.generateSessionId()) +
								' ' +
								r +
								' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
            );
          }),
          (n.writeMediaSection = function(e, t, r, i) {
            var a = n.writeRtpDescription(e.kind, t);
            if (
              ((a += n.writeIceParameters(
                e.iceGatherer.getLocalParameters()
              )),
              (a += n.writeDtlsParameters(
                e.dtlsTransport.getLocalParameters(),
                r === 'offer' ? 'actpass' : 'active'
              )),
              (a += 'a=mid:' + e.mid + '\r\n'),
              e.direction
                ? (a += 'a=' + e.direction + '\r\n')
                : e.rtpSender && e.rtpReceiver
                  ? (a += 'a=sendrecv\r\n')
                  : e.rtpSender
                    ? (a += 'a=sendonly\r\n')
                    : e.rtpReceiver
                      ? (a += 'a=recvonly\r\n')
                      : (a += 'a=inactive\r\n'),
              e.rtpSender)
            ) {
              var o =
									'msid:' +
									i.id +
									' ' +
									e.rtpSender.track.id +
									'\r\n';
              (a += 'a=' + o),
              (a +=
										'a=ssrc:' +
										e.sendEncodingParameters[0].ssrc +
										' ' +
										o),
              e.sendEncodingParameters[0].rtx &&
										((a +=
											'a=ssrc:' +
											e.sendEncodingParameters[0].rtx
											  .ssrc +
											' ' +
											o),
										(a +=
											'a=ssrc-group:FID ' +
											e.sendEncodingParameters[0].ssrc +
											' ' +
											e.sendEncodingParameters[0].rtx
											  .ssrc +
											'\r\n'));
            }
            return (
              (a +=
									'a=ssrc:' +
									e.sendEncodingParameters[0].ssrc +
									' cname:' +
									n.localCName +
									'\r\n'),
              e.rtpSender &&
									e.sendEncodingParameters[0].rtx &&
									(a +=
										'a=ssrc:' +
										e.sendEncodingParameters[0].rtx.ssrc +
										' cname:' +
										n.localCName +
										'\r\n'),
              a
            );
          }),
          (n.getDirection = function(e, t) {
            for (
              var r = n.splitLines(e), i = 0;
              i < r.length;
              i++
            ) {
              switch (r[i]) {
                case 'a=sendrecv':
                case 'a=sendonly':
                case 'a=recvonly':
                case 'a=inactive':
                  return r[i].substr(2);
              }
            }
            return t ? n.getDirection(t) : 'sendrecv';
          }),
          (n.getKind = function(e) {
            return n.splitLines(e)[0].split(' ')[0].substr(2);
          }),
          (n.isRejected = function(e) {
            return e.split(' ', 2)[1] === '0';
          }),
          (n.parseMLine = function(e) {
            var t = n.splitLines(e)[0].split(' ');
            return {
              kind: t[0].substr(2),
              port: parseInt(t[1], 10),
              protocol: t[2],
              fmt: t.slice(3).join(' ')
            };
          }),
          typeof t === 'object' && (t.exports = n);
        },
        {}
      ],
      3: [
        function(e, t, r) {
          (function(r) {
            'use strict';
            var n = e('./adapter_factory.js');
            t.exports = n({ window: r.window });
          }.call(
            this,
            typeof global !== 'undefined'
              ? global
              : typeof self !== 'undefined'
                ? self
                : typeof window !== 'undefined'
                  ? window
                  : {}
          ));
        },
        { './adapter_factory.js': 4 }
      ],
      4: [
        function(e, t, r) {
          'use strict';
          var n = e('./utils');
          t.exports = function(t, r) {
            var i = t && t.window;
            var a = {
              shimChrome: !0,
              shimFirefox: !0,
              shimEdge: !0,
              shimSafari: !0
            };
            for (var o in r) { hasOwnProperty.call(r, o) && (a[o] = r[o]); }
            var s = n.log;
            var c = n.detectBrowser(i);
            var d = {
              browserDetails: c,
              extractVersion: n.extractVersion,
              disableLog: n.disableLog,
              disableWarnings: n.disableWarnings
            };
            var p = e('./chrome/chrome_shim') || null;
            var u = e('./edge/edge_shim') || null;
            var f = e('./firefox/firefox_shim') || null;
            var l = e('./safari/safari_shim') || null;
            var m = e('./common_shim') || null;
            switch (c.browser) {
              case 'chrome':
                if (
                  !p ||
									!p.shimPeerConnection ||
									!a.shimChrome
                ) {
                  return (
                    s(
                      'Chrome shim is not included in this adapter release.'
                    ),
                    d
                  );
                }
                s('adapter.js shimming chrome.'),
                (d.browserShim = p),
                m.shimCreateObjectURL(i),
                p.shimGetUserMedia(i),
                p.shimMediaStream(i),
                p.shimSourceObject(i),
                p.shimPeerConnection(i),
                p.shimOnTrack(i),
                p.shimAddTrackRemoveTrack(i),
                p.shimGetSendersWithDtmf(i),
                m.shimRTCIceCandidate(i);
                break;
              case 'firefox':
                if (
                  !f ||
									!f.shimPeerConnection ||
									!a.shimFirefox
                ) {
                  return (
                    s(
                      'Firefox shim is not included in this adapter release.'
                    ),
                    d
                  );
                }
                s('adapter.js shimming firefox.'),
                (d.browserShim = f),
                m.shimCreateObjectURL(i),
                f.shimGetUserMedia(i),
                f.shimSourceObject(i),
                f.shimPeerConnection(i),
                f.shimOnTrack(i),
                f.shimRemoveStream(i),
                m.shimRTCIceCandidate(i);
                break;
              case 'edge':
                if (!u || !u.shimPeerConnection || !a.shimEdge) {
                  return (
                    s(
                      'MS edge shim is not included in this adapter release.'
                    ),
                    d
                  );
                }
                s('adapter.js shimming edge.'),
                (d.browserShim = u),
                m.shimCreateObjectURL(i),
                u.shimGetUserMedia(i),
                u.shimPeerConnection(i),
                u.shimReplaceTrack(i);
                break;
              case 'safari':
                if (!l || !a.shimSafari) {
                  return (
                    s(
                      'Safari shim is not included in this adapter release.'
                    ),
                    d
                  );
                }
                s('adapter.js shimming safari.'),
                (d.browserShim = l),
                m.shimCreateObjectURL(i),
                l.shimRTCIceServerUrls(i),
                l.shimCallbacksAPI(i),
                l.shimLocalStreamsAPI(i),
                l.shimRemoteStreamsAPI(i),
                l.shimTrackEventTransceiver(i),
                l.shimGetUserMedia(i),
                l.shimCreateOfferLegacy(i),
                m.shimRTCIceCandidate(i);
                break;
              default:
                s('Unsupported browser!');
            }
            return d;
          };
        },
        {
          './chrome/chrome_shim': 5,
          './common_shim': 7,
          './edge/edge_shim': 8,
          './firefox/firefox_shim': 10,
          './safari/safari_shim': 12,
          './utils': 13
        }
      ],
      5: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils.js');
          var i = n.log;
          var a = {
            shimMediaStream: function(e) {
              e.MediaStream =
									e.MediaStream || e.webkitMediaStream;
            },
            shimOnTrack: function(e) {
              if (
                typeof e === 'object' &&
									e.RTCPeerConnection &&
									!(
									  'ontrack' in
										e.RTCPeerConnection.prototype
									)
              ) {
                Object.defineProperty(
                  e.RTCPeerConnection.prototype,
                  'ontrack',
                  {
                    get: function() {
                      return this._ontrack;
                    },
                    set: function(e) {
                      this._ontrack &&
													this.removeEventListener(
													  'track',
													  this._ontrack
													),
                      this.addEventListener(
                        'track',
                        (this._ontrack = e)
                      );
                    }
                  }
                );
                var t =
										e.RTCPeerConnection.prototype
										  .setRemoteDescription;
                e.RTCPeerConnection.prototype.setRemoteDescription =
										function() {
										  var r = this;
										  return (
										    r._ontrackpoly ||
													((r._ontrackpoly =
														function(t) {
														  t.stream.addEventListener(
														    'addtrack',
														    function(n) {
														      var i;
														      i = e
														        .RTCPeerConnection
														        .prototype
														        .getReceivers
														        ? r
														          .getReceivers()
														          .find(
														            function(
														              e
														            ) {
														              return (
														                e.track &&
																							e
																							  .track
																							  .id ===
																								n
																								  .track
																								  .id
														              );
														            }
														          )
														        : {
														          track: n.track
																		  };
														      var a =
																		new Event(
																		  'track'
																		);
														      (a.track =
																		n.track),
														      (a.receiver =
																			i),
														      (a.transceiver =
																			{
																			  receiver:
																					i
																			}),
														      (a.streams =
																			[
																			  t.stream
																			]),
														      r.dispatchEvent(
														        a
														      );
														    }
														  ),
														  t.stream
														    .getTracks()
														    .forEach(
														      function(
														        n
														      ) {
														        var i;
														        i =
																				e
																				  .RTCPeerConnection
																				  .prototype
																				  .getReceivers
																				  ? r
																				    .getReceivers()
																				    .find(
																				      function(
																				        e
																				      ) {
																				        return (
																				          e.track &&
																										e
																										  .track
																										  .id ===
																											n.id
																				        );
																				      }
																				    )
																				  : {
																				    track: n
																					  };
														        var a =
																				new Event(
																				  'track'
																				);
														        (a.track =
																				n),
														        (a.receiver =
																					i),
														        (a.transceiver =
																					{
																					  receiver:
																							i
																					}),
														        (a.streams =
																					[
																					  t.stream
																					]),
														        r.dispatchEvent(
														          a
														        );
														      }
														    );
														}),
													r.addEventListener(
													  'addstream',
													  r._ontrackpoly
													)),
										    t.apply(r, arguments)
										  );
										};
              }
            },
            shimGetSendersWithDtmf: function(e) {
              if (
                typeof e === 'object' &&
									e.RTCPeerConnection &&
									!(
									  'getSenders' in
										e.RTCPeerConnection.prototype
									) &&
									'createDTMFSender' in
										e.RTCPeerConnection.prototype
              ) {
                var t = function(e, t) {
                  return {
                    track: t,
                    get dtmf() {
                      return (
                        void 0 === this._dtmf &&
														(t.kind === 'audio'
														  ? (this._dtmf =
																	e.createDTMFSender(
																	  t
																	))
														  : (this._dtmf =
																	null)),
                        this._dtmf
                      );
                    },
                    _pc: e
                  };
                };
                if (
                  !e.RTCPeerConnection.prototype
                    .getSenders
                ) {
                  e.RTCPeerConnection.prototype.getSenders =
											function() {
											  return (
											    (this._senders =
														this._senders || []),
											    this._senders.slice()
											  );
											};
                  var r =
											e.RTCPeerConnection.prototype
											  .addTrack;
                  e.RTCPeerConnection.prototype.addTrack =
											function(e, n) {
											  var i = r.apply(
											    this,
											    arguments
											  );
											  return (
											    i ||
														((i = t(this, e)),
														this._senders.push(i)),
											    i
											  );
											};
                  var n =
											e.RTCPeerConnection.prototype
											  .removeTrack;
                  e.RTCPeerConnection.prototype.removeTrack =
											function(e) {
											  n.apply(this, arguments);
											  var t =
													this._senders.indexOf(e);
											  t !== -1 &&
													this._senders.splice(t, 1);
											};
                }
                var i =
										e.RTCPeerConnection.prototype.addStream;
                e.RTCPeerConnection.prototype.addStream =
										function(e) {
										  var r = this;
										  (r._senders = r._senders || []),
										  i.apply(r, [e]),
										  e
										    .getTracks()
										    .forEach(function(e) {
										      r._senders.push(
										        t(r, e)
										      );
										    });
										};
                var a =
										e.RTCPeerConnection.prototype
										  .removeStream;
                e.RTCPeerConnection.prototype.removeStream =
										function(e) {
										  var t = this;
										  (t._senders = t._senders || []),
										  a.apply(t, [e]),
										  e
										    .getTracks()
										    .forEach(function(e) {
										      var r = t._senders.find(
										        function(t) {
										          return (
										            t.track ===
																	e
										          );
										        }
										      );
										      r &&
															t._senders.splice(
															  t._senders.indexOf(
															    r
															  ),
															  1
															);
										    });
										};
              } else if (
                typeof e === 'object' &&
									e.RTCPeerConnection &&
									'getSenders' in
										e.RTCPeerConnection.prototype &&
									'createDTMFSender' in
										e.RTCPeerConnection.prototype &&
									e.RTCRtpSender &&
									!('dtmf' in e.RTCRtpSender.prototype)
              ) {
                var o =
										e.RTCPeerConnection.prototype
										  .getSenders;
                (e.RTCPeerConnection.prototype.getSenders =
										function() {
										  var e = this;
										  var t = o.apply(e, []);
										  return (
										    t.forEach(function(t) {
										      t._pc = e;
										    }),
										    t
										  );
										}),
                Object.defineProperty(
                  e.RTCRtpSender.prototype,
                  'dtmf',
                  {
                    get: function() {
                      return (
                        void 0 === this._dtmf &&
															(this.track.kind ===
															'audio'
															  ? (this._dtmf =
																		this._pc.createDTMFSender(
																		  this
																		    .track
																		))
															  : (this._dtmf =
																		null)),
                        this._dtmf
                      );
                    }
                  }
                );
              }
            },
            shimSourceObject: function(e) {
              var t = e && e.URL;
              typeof e === 'object' &&
									(!e.HTMLMediaElement ||
										'srcObject' in
											e.HTMLMediaElement.prototype ||
										Object.defineProperty(
										  e.HTMLMediaElement.prototype,
										  'srcObject',
										  {
										    get: function() {
										      return this._srcObject;
										    },
										    set: function(e) {
										      var r = this;
										      (this._srcObject = e),
										      this.src &&
															t.revokeObjectURL(
															  this.src
															),
										      e
										        ? ((this.src =
																	t.createObjectURL(
																	  e
																	)),
															  e.addEventListener(
										          'addtrack',
										          function() {
										            r.src &&
																			t.revokeObjectURL(
																			  r.src
																			),
										            (r.src =
																				t.createObjectURL(
																				  e
																				));
										          }
															  ),
															  e.addEventListener(
										          'removetrack',
										          function() {
										            r.src &&
																			t.revokeObjectURL(
																			  r.src
																			),
										            (r.src =
																				t.createObjectURL(
																				  e
																				));
										          }
															  ))
										        : (this.src = '');
										    }
										  }
										));
            },
            shimAddTrackRemoveTrack: function(e) {
              function t(e, t) {
                var r = t.sdp;
                return (
                  Object.keys(
                    e._reverseStreams || []
                  ).forEach(function(t) {
                    var n = e._reverseStreams[t];
                    var i = e._streams[n.id];
                    r = r.replace(
                      new RegExp(i.id, 'g'),
                      n.id
                    );
                  }),
                  new RTCSessionDescription({
                    type: t.type,
                    sdp: r
                  })
                );
              }
              var r = n.detectBrowser(e);
              if (
                !(
                  e.RTCPeerConnection.prototype
                    .addTrack && r.version >= 64
                )
              ) {
                var i =
										e.RTCPeerConnection.prototype
										  .getLocalStreams;
                e.RTCPeerConnection.prototype.getLocalStreams =
										function() {
										  var e = this;
										  var t = i.apply(this);
										  return (
										    (e._reverseStreams =
													e._reverseStreams || {}),
										    t.map(function(t) {
										      return e
										        ._reverseStreams[t.id];
										    })
										  );
										};
                var a =
										e.RTCPeerConnection.prototype.addStream;
                e.RTCPeerConnection.prototype.addStream =
										function(t) {
										  var r = this;
										  if (
										    ((r._streams =
													r._streams || {}),
										    (r._reverseStreams =
													r._reverseStreams || {}),
										    t
										      .getTracks()
										      .forEach(function(e) {
										        if (
										          r
										            .getSenders()
										            .find(function(
										              t
										            ) {
										              return (
										                t.track ===
																		e
										              );
										            })
										        ) {
										          throw new DOMException(
										            'Track already exists.',
										            'InvalidAccessError'
										          );
										        }
										      }),
										    !r._reverseStreams[t.id])
										  ) {
										    var n = new e.MediaStream(
										      t.getTracks()
										    );
										    (r._streams[t.id] = n),
										    (r._reverseStreams[n.id] =
														t),
										    (t = n);
										  }
										  a.apply(r, [t]);
										};
                var o =
										e.RTCPeerConnection.prototype
										  .removeStream;
                (e.RTCPeerConnection.prototype.removeStream =
										function(e) {
										  var t = this;
										  (t._streams = t._streams || {}),
										  (t._reverseStreams =
													t._reverseStreams || {}),
										  o.apply(t, [
										    t._streams[e.id] || e
										  ]),
										  delete t._reverseStreams[
										    t._streams[e.id]
										      ? t._streams[e.id].id
										      : e.id
										  ],
										  delete t._streams[e.id];
										}),
                (e.RTCPeerConnection.prototype.addTrack =
											function(t, r) {
											  var n = this;
											  if (
											    n.signalingState ===
													'closed'
											  ) {
											    throw new DOMException(
											      "The RTCPeerConnection's signalingState is 'closed'.",
											      'InvalidStateError'
											    );
											  }
											  var i = [].slice.call(
											    arguments,
											    1
											  );
											  if (
											    i.length !== 1 ||
													!i[0]
													  .getTracks()
													  .find(function(e) {
													    return e === t;
													  })
											  ) {
											    throw new DOMException(
											      'The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.',
											      'NotSupportedError'
											    );
											  }
											  if (
											    n
											      .getSenders()
											      .find(function(e) {
											        return (
											          e.track === t
											        );
											      })
											  ) {
											    throw new DOMException(
											      'Track already exists.',
											      'InvalidAccessError'
											    );
											  }
											  (n._streams = n._streams || {}),
											  (n._reverseStreams =
														n._reverseStreams ||
														{});
											  var a = n._streams[r.id];
											  if (a) {
											    a.addTrack(t),
											    Promise.resolve().then(
											      function() {
											        n.dispatchEvent(
											          new Event(
											            'negotiationneeded'
											          )
											        );
											      }
											    );
											  } else {
											    var o = new e.MediaStream([
											      t
											    ]);
											    (n._streams[r.id] = o),
											    (n._reverseStreams[
											      o.id
											    ] = r),
											    n.addStream(o);
											  }
											  return n
											    .getSenders()
											    .find(function(e) {
											      return e.track === t;
											    });
											}),
                ['createOffer', 'createAnswer'].forEach(
                  function(r) {
                    var n =
													e.RTCPeerConnection
													  .prototype[r];
                    e.RTCPeerConnection.prototype[
                      r
                    ] = function() {
                      var e = this;
                      var r = arguments;
                      return arguments.length &&
														typeof arguments[0] ===
															'function'
                        ? n.apply(e, [
                          function(n) {
                            var i = t(
                              e,
                              n
                            );
                            r[0].apply(
                              null,
                              [i]
                            );
                          },
                          function(e) {
                            r[1] &&
																		r[1].apply(
																		  null,
																		  e
																		);
                          },
                          arguments[2]
														  ])
                        : n
                          .apply(
                            e,
                            arguments
                          )
                          .then(function(
                            r
                          ) {
                            return t(
                              e,
                              r
                            );
                          });
                    };
                  }
                );
                var s =
										e.RTCPeerConnection.prototype
										  .setLocalDescription;
                e.RTCPeerConnection.prototype.setLocalDescription =
										function() {
										  return arguments.length &&
												arguments[0].type
										    ? ((arguments[0] = (function(
										      e,
										      t
												  ) {
										      var r = t.sdp;
										      return (
										        Object.keys(
										          e._reverseStreams ||
																	[]
										        ).forEach(function(
										          t
										        ) {
										          var n =
																		e
																		  ._reverseStreams[
																		    t
																		  ];
										          var i =
																		e
																		  ._streams[
																		    n.id
																		  ];
										          r = r.replace(
										            new RegExp(
										              n.id,
										              'g'
										            ),
										            i.id
										          );
										        }),
										        new RTCSessionDescription(
										          {
										            type: t.type,
										            sdp: r
										          }
										        )
										      );
												  })(this, arguments[0])),
												  s.apply(this, arguments))
										    : s.apply(this, arguments);
										};
                var c = Object.getOwnPropertyDescriptor(
                  e.RTCPeerConnection.prototype,
                  'localDescription'
                );
                Object.defineProperty(
                  e.RTCPeerConnection.prototype,
                  'localDescription',
                  {
                    get: function() {
                      var e = c.get.apply(this);
                      return e.type === ''
                        ? e
                        : t(this, e);
                    }
                  }
                ),
                (e.RTCPeerConnection.prototype.removeTrack =
											function(e) {
											  var t = this;
											  if (
											    t.signalingState ===
													'closed'
											  ) {
											    throw new DOMException(
											      "The RTCPeerConnection's signalingState is 'closed'.",
											      'InvalidStateError'
											    );
											  }
											  if (!e._pc) {
											    throw new DOMException(
											      'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
											      'TypeError'
											    );
											  }
											  if (!(e._pc === t)) {
											    throw new DOMException(
											      'Sender was not created by this connection.',
											      'InvalidAccessError'
											    );
											  }
											  t._streams = t._streams || {};
											  var r;
											  Object.keys(t._streams).forEach(
											    function(n) {
											      t._streams[n]
											        .getTracks()
											        .find(function(t) {
											          return (
											            e.track ===
																	t
											          );
											        }) &&
															(r = t._streams[n]);
											    }
											  ),
											  r &&
														(r.getTracks().length ===
														1
														  ? t.removeStream(
														    t
														      ._reverseStreams[
														        r.id
														      ]
															  )
														  : r.removeTrack(
														    e.track
															  ),
														t.dispatchEvent(
														  new Event(
														    'negotiationneeded'
														  )
														));
											});
              }
            },
            shimPeerConnection: function(e) {
              var t = n.detectBrowser(e);
              if (e.RTCPeerConnection) {
                var r = e.RTCPeerConnection;
                (e.RTCPeerConnection = function(e, t) {
                  if (e && e.iceServers) {
                    for (
                      var i = [], a = 0;
                      a < e.iceServers.length;
                      a++
                    ) {
                      var o = e.iceServers[a];
                      !o.hasOwnProperty('urls') &&
												o.hasOwnProperty('url')
                        ? (n.deprecated(
                          'RTCIceServer.url',
                          'RTCIceServer.urls'
													  ),
													  ((o = JSON.parse(
                          JSON.stringify(o)
													  )).urls = o.url),
													  i.push(o))
                        : i.push(e.iceServers[a]);
                    }
                    e.iceServers = i;
                  }
                  return new r(e, t);
                }),
                (e.RTCPeerConnection.prototype =
											r.prototype),
                Object.defineProperty(
                  e.RTCPeerConnection,
                  'generateCertificate',
                  {
                    get: function() {
                      return r.generateCertificate;
                    }
                  }
                );
              } else {
                (e.RTCPeerConnection = function(t, r) {
                  return (
                    i('PeerConnection'),
                    t &&
												t.iceTransportPolicy &&
												(t.iceTransports =
													t.iceTransportPolicy),
                    new e.webkitRTCPeerConnection(t, r)
                  );
                }),
                (e.RTCPeerConnection.prototype =
											e.webkitRTCPeerConnection.prototype),
                e.webkitRTCPeerConnection
                  .generateCertificate &&
											Object.defineProperty(
											  e.RTCPeerConnection,
											  'generateCertificate',
											  {
											    get: function() {
											      return e
											        .webkitRTCPeerConnection
											        .generateCertificate;
											    }
											  }
											);
              }
              var a = e.RTCPeerConnection.prototype.getStats;
              (e.RTCPeerConnection.prototype.getStats =
									function(e, t, r) {
									  var n = this;
									  var i = arguments;
									  if (
									    arguments.length > 0 &&
											typeof e === 'function'
									  ) { return a.apply(this, arguments); }
									  if (
									    a.length === 0 &&
											(arguments.length === 0 ||
												typeof arguments[0] !==
													'function')
									  ) { return a.apply(this, []); }
									  var o = function(e) {
									      var t = {};
									      return (
									        e
									          .result()
									          .forEach(function(e) {
									            var r = {
									              id: e.id,
									              timestamp:
																	e.timestamp,
									              type:
																	{
																	  localcandidate:
																			'local-candidate',
																	  remotecandidate:
																			'remote-candidate'
																	}[e.type] ||
																	e.type
									            };
									            e
									              .names()
									              .forEach(
									                function(
									                  t
									                ) {
									                  r[t] =
																			e.stat(
																			  t
																			);
									                }
									              ),
									            (t[r.id] = r);
									          }),
									        t
									      );
									    };
									  var s = function(e) {
									      return new Map(
									        Object.keys(e).map(
									          function(t) {
									            return [t, e[t]];
									          }
									        )
									      );
									    };
									  if (arguments.length >= 2) {
									    return a.apply(this, [
									      function(e) {
									        i[1](s(o(e)));
									      },
									      arguments[0]
									    ]);
									  }
									  return new Promise(function(e, t) {
									    a.apply(n, [
									      function(t) {
									        e(s(o(t)));
									      },
									      t
									    ]);
									  }).then(t, r);
									}),
              t.version < 51 &&
										[
										  'setLocalDescription',
										  'setRemoteDescription',
										  'addIceCandidate'
										].forEach(function(t) {
										  var r =
												e.RTCPeerConnection.prototype[
												  t
												];
										  e.RTCPeerConnection.prototype[t] =
												function() {
												  var e = arguments;
												  var t = this;
												  var n = new Promise(
												      function(n, i) {
												        r.apply(t, [
												          e[0],
												          n,
												          i
												        ]);
												      }
												    );
												  return e.length < 2
												    ? n
												    : n.then(
												      function() {
												        e[1].apply(
												          null,
												          []
												        );
												      },
												      function(t) {
												        e.length >=
																		3 &&
																		e[2].apply(
																		  null,
																		  [t]
																		);
												      }
														  );
												};
										}),
              t.version < 52 &&
										['createOffer', 'createAnswer'].forEach(
										  function(t) {
										    var r =
													e.RTCPeerConnection
													  .prototype[t];
										    e.RTCPeerConnection.prototype[
										      t
										    ] = function() {
										      var e = this;
										      if (
										        arguments.length < 1 ||
														(arguments.length ===
															1 &&
															typeof arguments[0] ===
																'object')
										      ) {
										        var t =
															arguments.length ===
															1
															  ? arguments[0]
															  : void 0;
										        return new Promise(
										          function(n, i) {
										            r.apply(e, [
										              n,
										              i,
										              t
										            ]);
										          }
										        );
										      }
										      return r.apply(
										        this,
										        arguments
										      );
										    };
										  }
										),
              [
                'setLocalDescription',
                'setRemoteDescription',
                'addIceCandidate'
              ].forEach(function(t) {
                var r =
											e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] =
											function() {
											  return (
											    (arguments[0] = new (
											      t === 'addIceCandidate'
											        ? e.RTCIceCandidate
											        : e.RTCSessionDescription
											    )(arguments[0])),
											    r.apply(this, arguments)
											  );
											};
              });
              var o =
									e.RTCPeerConnection.prototype
									  .addIceCandidate;
              e.RTCPeerConnection.prototype.addIceCandidate =
									function() {
									  return arguments[0]
									    ? o.apply(this, arguments)
									    : (arguments[1] &&
													arguments[1].apply(null),
											  Promise.resolve());
									};
            }
          };
          t.exports = {
            shimMediaStream: a.shimMediaStream,
            shimOnTrack: a.shimOnTrack,
            shimAddTrackRemoveTrack: a.shimAddTrackRemoveTrack,
            shimGetSendersWithDtmf: a.shimGetSendersWithDtmf,
            shimSourceObject: a.shimSourceObject,
            shimPeerConnection: a.shimPeerConnection,
            shimGetUserMedia: e('./getusermedia')
          };
        },
        { '../utils.js': 13, './getusermedia': 6 }
      ],
      6: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils.js');
          var i = n.log;
          t.exports = function(e) {
            var t = n.detectBrowser(e);
            var r = e && e.navigator;
            var a = function(e) {
              if (
                typeof e !== 'object' ||
									e.mandatory ||
									e.optional
              ) { return e; }
              var t = {};
              return (
                Object.keys(e).forEach(function(r) {
                  if (
                    r !== 'require' &&
											r !== 'advanced' &&
											r !== 'mediaSource'
                  ) {
                    var n =
												typeof e[r] === 'object'
												  ? e[r]
												  : { ideal: e[r] };
                    void 0 !== n.exact &&
												typeof n.exact === 'number' &&
												(n.min = n.max = n.exact);
                    var i = function(e, t) {
                      return e
                        ? e +
															t
															  .charAt(0)
															  .toUpperCase() +
															t.slice(1)
                        : t === 'deviceId'
                          ? 'sourceId'
                          : t;
                    };
                    if (void 0 !== n.ideal) {
                      t.optional = t.optional || [];
                      var a = {};
                      typeof n.ideal === 'number'
                        ? ((a[i('min', r)] =
															n.ideal),
													  t.optional.push(a),
													  ((a = {})[i('max', r)] =
															n.ideal),
													  t.optional.push(a))
                        : ((a[i('', r)] = n.ideal),
													  t.optional.push(a));
                    }
                    void 0 !== n.exact &&
											typeof n.exact !== 'number'
                      ? ((t.mandatory =
														t.mandatory || {}),
												  (t.mandatory[i('', r)] =
														n.exact))
                      : ['min', 'max'].forEach(
                        function(e) {
                          void 0 !== n[e] &&
																((t.mandatory =
																	t.mandatory ||
																	{}),
																(t.mandatory[
																  i(e, r)
																] = n[e]));
                        }
												  );
                  }
                }),
                e.advanced &&
										(t.optional = (t.optional || []).concat(
										  e.advanced
										)),
                t
              );
            };
            var o = function(e, n) {
              if (t.version >= 61) return n(e);
              if (
                (e = JSON.parse(JSON.stringify(e))) &&
									typeof e.audio === 'object'
              ) {
                var o = function(e, t, r) {
                  t in e &&
											!(r in e) &&
											((e[r] = e[t]), delete e[t]);
                };
                o(
                  (e = JSON.parse(JSON.stringify(e)))
                    .audio,
                  'autoGainControl',
                  'googAutoGainControl'
                ),
                o(
                  e.audio,
                  'noiseSuppression',
                  'googNoiseSuppression'
                ),
                (e.audio = a(e.audio));
              }
              if (e && typeof e.video === 'object') {
                var s = e.video.facingMode;
                s =
										s &&
										(typeof s === 'object'
										  ? s
										  : { ideal: s });
                var c = t.version < 66;
                if (
                  s &&
										(s.exact === 'user' ||
											s.exact === 'environment' ||
											s.ideal === 'user' ||
											s.ideal === 'environment') &&
										(!r.mediaDevices
										  .getSupportedConstraints ||
											!r.mediaDevices.getSupportedConstraints()
											  .facingMode ||
											c)
                ) {
                  delete e.video.facingMode;
                  var d;
                  if (
                    (s.exact === 'environment' ||
											s.ideal === 'environment'
                      ? (d = ['back', 'rear'])
                      : (s.exact !== 'user' &&
														s.ideal !== 'user') ||
												  (d = ['front']),
                    d)
                  ) {
                    return r.mediaDevices
                      .enumerateDevices()
                      .then(function(t) {
                        var r = (t = t.filter(
                          function(e) {
                            return (
                              e.kind ===
																'videoinput'
                            );
                          }
                        )).find(function(e) {
                          return d.some(function(
                            t
                          ) {
                            return (
                              e.label
																  .toLowerCase()
																  .indexOf(t) !==
																-1
                            );
                          });
                        });
                        return (
                          !r &&
															t.length &&
															d.indexOf(
															  'back'
															) !==
																-1 &&
															(r =
																t[
																  t.length - 1
																]),
                          r &&
															(e.video.deviceId =
																s.exact
																  ? {
																    exact: r.deviceId
																	  }
																  : {
																    ideal: r.deviceId
																	  }),
                          (e.video = a(e.video)),
                          i(
                            'chrome: ' +
																JSON.stringify(
																  e
																)
                          ),
                          n(e)
                        );
                      });
                  }
                }
                e.video = a(e.video);
              }
              return i('chrome: ' + JSON.stringify(e)), n(e);
            };
            var s = function(e) {
              return {
                name:
										{
										  PermissionDeniedError:
												'NotAllowedError',
										  InvalidStateError:
												'NotReadableError',
										  DevicesNotFoundError:
												'NotFoundError',
										  ConstraintNotSatisfiedError:
												'OverconstrainedError',
										  TrackStartError: 'NotReadableError',
										  MediaDeviceFailedDueToShutdown:
												'NotReadableError',
										  MediaDeviceKillSwitchOn:
												'NotReadableError'
										}[e.name] || e.name,
                message: e.message,
                constraint: e.constraintName,
                toString: function() {
                  return (
                    this.name +
											(this.message && ': ') +
											this.message
                  );
                }
              };
            };
            r.getUserMedia = function(e, t, n) {
              o(e, function(e) {
                r.webkitGetUserMedia(e, t, function(e) {
                  n && n(s(e));
                });
              });
            };
            var c = function(e) {
              return new Promise(function(t, n) {
                r.getUserMedia(e, t, n);
              });
            };
            if (
              (r.mediaDevices ||
								(r.mediaDevices = {
								  getUserMedia: c,
								  enumerateDevices: function() {
								    return new Promise(function(t) {
								      var r = {
								        audio: 'audioinput',
								        video: 'videoinput'
								      };
								      return e.MediaStreamTrack.getSources(
								        function(e) {
								          t(
								            e.map(function(e) {
								              return {
								                label: e.label,
								                kind: r[e.kind],
								                deviceId: e.id,
								                groupId: ''
								              };
								            })
								          );
								        }
								      );
								    });
								  },
								  getSupportedConstraints: function() {
								    return {
								      deviceId: !0,
								      echoCancellation: !0,
								      facingMode: !0,
								      frameRate: !0,
								      height: !0,
								      width: !0
								    };
								  }
								}),
              r.mediaDevices.getUserMedia)
            ) {
              var d = r.mediaDevices.getUserMedia.bind(
                r.mediaDevices
              );
              r.mediaDevices.getUserMedia = function(e) {
                return o(e, function(e) {
                  return d(e).then(
                    function(t) {
                      if (
                        (e.audio &&
													!t.getAudioTracks()
													  .length) ||
												(e.video &&
													!t.getVideoTracks().length)
                      ) {
                        throw (
                          (t
                            .getTracks()
                            .forEach(function(e) {
                              e.stop();
                            }),
                          new DOMException(
                            '',
                            'NotFoundError'
                          ))
                        );
                      }
                      return t;
                    },
                    function(e) {
                      return Promise.reject(s(e));
                    }
                  );
                });
              };
            } else {
              r.mediaDevices.getUserMedia = function(e) {
                return c(e);
              };
            }
            void 0 === r.mediaDevices.addEventListener &&
							(r.mediaDevices.addEventListener = function() {
							  i(
							    'Dummy mediaDevices.addEventListener called.'
							  );
							}),
            void 0 === r.mediaDevices.removeEventListener &&
								(r.mediaDevices.removeEventListener =
									function() {
									  i(
									    'Dummy mediaDevices.removeEventListener called.'
									  );
									});
          };
        },
        { '../utils.js': 13 }
      ],
      7: [
        function(e, t, r) {
          'use strict';
          var n = e('sdp');
          var i = e('./utils');
          t.exports = {
            shimRTCIceCandidate: function(e) {
              if (
                !(
                  e.RTCIceCandidate &&
									'foundation' in e.RTCIceCandidate.prototype
                )
              ) {
                var t = e.RTCIceCandidate;
                (e.RTCIceCandidate = function(e) {
                  typeof e === 'object' &&
										e.candidate &&
										e.candidate.indexOf('a=') === 0 &&
										((e = JSON.parse(
										  JSON.stringify(e)
										)).candidate = e.candidate.substr(2));
                  var r = new t(e);
                  var i = n.parseCandidate(e.candidate);
                  var a = Object.assign(r, i);
                  return (
                    (a.toJSON = function() {
                      return {
                        candidate: a.candidate,
                        sdpMid: a.sdpMid,
                        sdpMLineIndex: a.sdpMLineIndex,
                        usernameFragment:
													a.usernameFragment
                      };
                    }),
                    a
                  );
                }),
                (function(e, t, r) {
                  if (e.RTCPeerConnection) {
                    var n =
													e.RTCPeerConnection
													  .prototype;
                    var i = n.addEventListener;
                    n.addEventListener = function(
                      e,
                      n
                    ) {
                      if (e !== t) {
                        return i.apply(
                          this,
                          arguments
                        );
                      }
                      var a = function(e) {
                        n(r(e));
                      };
                      return (
                        (this._eventMap =
														this._eventMap || {}),
                        (this._eventMap[n] = a),
                        i.apply(this, [e, a])
                      );
                    };
                    var a = n.removeEventListener;
                    (n.removeEventListener = function(
                      e,
                      r
                    ) {
                      if (
                        e !== t ||
													!this._eventMap ||
													!this._eventMap[r]
                      ) {
                        return a.apply(
                          this,
                          arguments
                        );
                      }
                      var n = this._eventMap[r];
                      return (
                        delete this._eventMap[r],
                        a.apply(this, [e, n])
                      );
                    }),
                    Object.defineProperty(
                      n,
                      'on' + t,
                      {
                        get: function() {
                          return this[
                            '_on' + t
                          ];
                        },
                        set: function(e) {
                          this['_on' + t] &&
																(this.removeEventListener(
																  t,
																  this[
																    '_on' +
																			t
																  ]
																),
																delete this[
																  '_on' + t
																]),
                          e &&
																	this.addEventListener(
																	  t,
																	  (this[
																	    '_on' +
																				t
																	  ] = e)
																	);
                        }
                      }
                    );
                  }
                })(e, 'icecandidate', function(t) {
                  return (
                    t.candidate &&
												Object.defineProperty(
												  t,
												  'candidate',
												  {
												    value: new e.RTCIceCandidate(
												      t.candidate
												    ),
												    writable: 'false'
												  }
												),
                    t
                  );
                });
              }
            },
            shimCreateObjectURL: function(e) {
              var t = e && e.URL;
              if (
                typeof e === 'object' &&
								e.HTMLMediaElement &&
								'srcObject' in e.HTMLMediaElement.prototype &&
								t.createObjectURL &&
								t.revokeObjectURL
              ) {
                var r = t.createObjectURL.bind(t);
                var n = t.revokeObjectURL.bind(t);
                var a = new Map();
                var o = 0;
                (t.createObjectURL = function(e) {
                  if ('getTracks' in e) {
                    var t = 'polyblob:' + ++o;
                    return (
                      a.set(t, e),
                      i.deprecated(
                        'URL.createObjectURL(stream)',
                        'elem.srcObject = stream'
                      ),
                      t
                    );
                  }
                  return r(e);
                }),
                (t.revokeObjectURL = function(e) {
                  n(e), a.delete(e);
                });
                var s = Object.getOwnPropertyDescriptor(
                  e.HTMLMediaElement.prototype,
                  'src'
                );
                Object.defineProperty(
                  e.HTMLMediaElement.prototype,
                  'src',
                  {
                    get: function() {
                      return s.get.apply(this);
                    },
                    set: function(e) {
                      return (
                        (this.srcObject =
													a.get(e) || null),
                        s.set.apply(this, [e])
                      );
                    }
                  }
                );
                var c =
									e.HTMLMediaElement.prototype.setAttribute;
                e.HTMLMediaElement.prototype.setAttribute =
									function() {
									  return (
									    arguments.length === 2 &&
												(
													  '' + arguments[0]
												).toLowerCase() ===
													'src' &&
												(this.srcObject =
													a.get(arguments[1]) ||
													null),
									    c.apply(this, arguments)
									  );
									};
              }
            }
          };
        },
        { './utils': 13, sdp: 2 }
      ],
      8: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils');
          var i = e('rtcpeerconnection-shim');
          t.exports = {
            shimGetUserMedia: e('./getusermedia'),
            shimPeerConnection: function(e) {
              var t = n.detectBrowser(e);
              if (
                e.RTCIceGatherer &&
								(e.RTCIceCandidate ||
									(e.RTCIceCandidate = function(e) {
									  return e;
									}),
								e.RTCSessionDescription ||
									(e.RTCSessionDescription = function(e) {
									  return e;
									}),
								t.version < 15025)
              ) {
                var r = Object.getOwnPropertyDescriptor(
                  e.MediaStreamTrack.prototype,
                  'enabled'
                );
                Object.defineProperty(
                  e.MediaStreamTrack.prototype,
                  'enabled',
                  {
                    set: function(e) {
                      r.set.call(this, e);
                      var t = new Event('enabled');
                      (t.enabled = e),
                      this.dispatchEvent(t);
                    }
                  }
                );
              }
              !e.RTCRtpSender ||
								'dtmf' in e.RTCRtpSender.prototype ||
								Object.defineProperty(
								  e.RTCRtpSender.prototype,
								  'dtmf',
								  {
								    get: function() {
								      return (
								        void 0 === this._dtmf &&
													(this.track.kind === 'audio'
													  ? (this._dtmf =
																new e.RTCDtmfSender(
																  this
																))
													  : this.track
																  .kind ===
																'video' &&
														  (this._dtmf = null)),
								        this._dtmf
								      );
								    }
								  }
								),
              (e.RTCPeerConnection = i(e, t.version));
            },
            shimReplaceTrack: function(e) {
              !e.RTCRtpSender ||
								'replaceTrack' in e.RTCRtpSender.prototype ||
								(e.RTCRtpSender.prototype.replaceTrack =
									e.RTCRtpSender.prototype.setTrack);
            }
          };
        },
        {
          '../utils': 13,
          './getusermedia': 9,
          'rtcpeerconnection-shim': 1
        }
      ],
      9: [
        function(e, t, r) {
          'use strict';
          t.exports = function(e) {
            var t = e && e.navigator;
            var r = t.mediaDevices.getUserMedia.bind(
              t.mediaDevices
            );
            t.mediaDevices.getUserMedia = function(e) {
              return r(e).catch(function(e) {
                return Promise.reject(
                  (function(e) {
                    return {
                      name:
												{
												  PermissionDeniedError:
														'NotAllowedError'
												}[e.name] || e.name,
                      message: e.message,
                      constraint: e.constraint,
                      toString: function() {
                        return this.name;
                      }
                    };
                  })(e)
                );
              });
            };
          };
        },
        {}
      ],
      10: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils');
          var i = {
            shimOnTrack: function(e) {
              typeof e !== 'object' ||
									!e.RTCPeerConnection ||
									'ontrack' in
										e.RTCPeerConnection.prototype ||
									Object.defineProperty(
									  e.RTCPeerConnection.prototype,
									  'ontrack',
									  {
									    get: function() {
									      return this._ontrack;
									    },
									    set: function(e) {
									      this._ontrack &&
													(this.removeEventListener(
													  'track',
													  this._ontrack
													),
													this.removeEventListener(
													  'addstream',
													  this._ontrackpoly
													)),
									      this.addEventListener(
									        'track',
									        (this._ontrack = e)
									      ),
									      this.addEventListener(
									        'addstream',
									        (this._ontrackpoly =
															function(e) {
															  e.stream
															    .getTracks()
															    .forEach(
															      function(
															        t
															      ) {
															        var r =
																				new Event(
																				  'track'
																				);
															        (r.track =
																				t),
															        (r.receiver =
																					{
																					  track: t
																					}),
															        (r.transceiver =
																					{
																					  receiver:
																							r.receiver
																					}),
															        (r.streams =
																					[
																					  e.stream
																					]),
															        this.dispatchEvent(
															          r
															        );
															      }.bind(
															        this
															      )
															    );
															}.bind(this))
									      );
									    }
									  }
									),
              typeof e === 'object' &&
										e.RTCTrackEvent &&
										'receiver' in
											e.RTCTrackEvent.prototype &&
										!(
										  'transceiver' in
											e.RTCTrackEvent.prototype
										) &&
										Object.defineProperty(
										  e.RTCTrackEvent.prototype,
										  'transceiver',
										  {
										    get: function() {
										      return {
										        receiver: this.receiver
										      };
										    }
										  }
										);
            },
            shimSourceObject: function(e) {
              typeof e === 'object' &&
									(!e.HTMLMediaElement ||
										'srcObject' in
											e.HTMLMediaElement.prototype ||
										Object.defineProperty(
										  e.HTMLMediaElement.prototype,
										  'srcObject',
										  {
										    get: function() {
										      return this.mozSrcObject;
										    },
										    set: function(e) {
										      this.mozSrcObject = e;
										    }
										  }
										));
            },
            shimPeerConnection: function(e) {
              var t = n.detectBrowser(e);
              if (
                typeof e === 'object' &&
									(e.RTCPeerConnection ||
										e.mozRTCPeerConnection)
              ) {
                e.RTCPeerConnection ||
										((e.RTCPeerConnection = function(
										  r,
										  n
										) {
										  if (
										    t.version < 38 &&
												r &&
												r.iceServers
										  ) {
										    for (
										      var i = [], a = 0;
										      a < r.iceServers.length;
										      a++
										    ) {
										      var o = r.iceServers[a];
										      if (
										        o.hasOwnProperty('urls')
										      ) {
										        for (
										          var s = 0;
										          s < o.urls.length;
										          s++
										        ) {
										          var c = {
										            url: o.urls[s]
										          };
										          o.urls[
																  s
										        ].indexOf(
																  'turn'
										        ) ===
																0 &&
																((c.username =
																	o.username),
																(c.credential =
																	o.credential)),
										          i.push(c);
										        }
										      } else { i.push(r.iceServers[a]); }
										    }
										    r.iceServers = i;
										  }
										  return new e.mozRTCPeerConnection(
										    r,
										    n
										  );
										}),
										(e.RTCPeerConnection.prototype =
											e.mozRTCPeerConnection.prototype),
										e.mozRTCPeerConnection
										  .generateCertificate &&
											Object.defineProperty(
											  e.RTCPeerConnection,
											  'generateCertificate',
											  {
											    get: function() {
											      return e
											        .mozRTCPeerConnection
											        .generateCertificate;
											    }
											  }
											),
										(e.RTCSessionDescription =
											e.mozRTCSessionDescription),
										(e.RTCIceCandidate =
											e.mozRTCIceCandidate)),
                [
                  'setLocalDescription',
                  'setRemoteDescription',
                  'addIceCandidate'
                ].forEach(function(t) {
                  var r =
												e.RTCPeerConnection.prototype[
												  t
												];
                  e.RTCPeerConnection.prototype[t] =
												function() {
												  return (
												    (arguments[0] = new (
												      t ===
															'addIceCandidate'
												        ? e.RTCIceCandidate
												        : e.RTCSessionDescription
												    )(arguments[0])),
												    r.apply(this, arguments)
												  );
												};
                });
                var r =
										e.RTCPeerConnection.prototype
										  .addIceCandidate;
                e.RTCPeerConnection.prototype.addIceCandidate =
										function() {
										  return arguments[0]
										    ? r.apply(this, arguments)
										    : (arguments[1] &&
														arguments[1].apply(
														  null
														),
												  Promise.resolve());
										};
                var i = {
                  inboundrtp: 'inbound-rtp',
                  outboundrtp: 'outbound-rtp',
                  candidatepair: 'candidate-pair',
                  localcandidate: 'local-candidate',
                  remotecandidate: 'remote-candidate'
                };
                var a =
											e.RTCPeerConnection.prototype
											  .getStats;
                e.RTCPeerConnection.prototype.getStats =
										function(e, r, n) {
										  return a
										    .apply(this, [e || null])
										    .then(function(e) {
										      if (
										        (t.version < 48 &&
															(e = (function(e) {
															  var t =
																	new Map();
															  return (
															    Object.keys(
															      e
															    ).forEach(
															      function(
															        r
															      ) {
															        t.set(
															          r,
															          e[
															            r
															          ]
															        ),
															        (t[
															          r
															        ] =
																					e[
																					  r
																					]);
															      }
															    ),
															    t
															  );
															})(e)),
										        t.version < 53 && !r)
										      ) {
										        try {
										          e.forEach(function(
										            e
										          ) {
										            e.type =
																	i[e.type] ||
																	e.type;
										          });
										        } catch (t) {
										          if (
										            t.name !==
																'TypeError'
										          ) { throw t; }
										          e.forEach(function(
										            t,
										            r
										          ) {
										            e.set(
										              r,
										              Object.assign(
										                {},
										                t,
										                {
										                  type:
																				i[
																				  t
																				    .type
																				] ||
																				t.type
										                }
										              )
										            );
										          });
										        }
										      }
										      return e;
										    })
										    .then(r, n);
										};
              }
            },
            shimRemoveStream: function(e) {
              !e.RTCPeerConnection ||
									'removeStream' in
										e.RTCPeerConnection.prototype ||
									(e.RTCPeerConnection.prototype.removeStream =
										function(e) {
										  var t = this;
										  n.deprecated(
										    'removeStream',
										    'removeTrack'
										  ),
										  this.getSenders().forEach(
										    function(r) {
										      r.track &&
															e
															  .getTracks()
															  .indexOf(
															    r.track
															  ) !==
																-1 &&
															t.removeTrack(r);
										    }
										  );
										});
            }
          };
          t.exports = {
            shimOnTrack: i.shimOnTrack,
            shimSourceObject: i.shimSourceObject,
            shimPeerConnection: i.shimPeerConnection,
            shimRemoveStream: i.shimRemoveStream,
            shimGetUserMedia: e('./getusermedia')
          };
        },
        { '../utils': 13, './getusermedia': 11 }
      ],
      11: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils');
          var i = n.log;
          t.exports = function(e) {
            var t = n.detectBrowser(e);
            var r = e && e.navigator;
            var a = e && e.MediaStreamTrack;
            var o = function(e) {
              return {
                name:
										{
										  InternalError: 'NotReadableError',
										  NotSupportedError: 'TypeError',
										  PermissionDeniedError:
												'NotAllowedError',
										  SecurityError: 'NotAllowedError'
										}[e.name] || e.name,
                message:
										{
										  'The operation is insecure.':
												'The request is not allowed by the user agent or the platform in the current context.'
										}[e.message] || e.message,
                constraint: e.constraint,
                toString: function() {
                  return (
                    this.name +
											(this.message && ': ') +
											this.message
                  );
                }
              };
            };
            var s = function(e, n, a) {
              var s = function(e) {
                if (typeof e !== 'object' || e.require) { return e; }
                var t = [];
                return (
                  Object.keys(e).forEach(function(r) {
                    if (
                      r !== 'require' &&
												r !== 'advanced' &&
												r !== 'mediaSource'
                    ) {
                      var n = (e[r] =
													typeof e[r] === 'object'
													  ? e[r]
													  : { ideal: e[r] });
                      if (
                        ((void 0 === n.min &&
														void 0 === n.max &&
														void 0 === n.exact) ||
														t.push(r),
                        void 0 !== n.exact &&
														(typeof n.exact ===
														'number'
														  ? (n.min = n.max =
																	n.exact)
														  : (e[r] = n.exact),
														delete n.exact),
                        void 0 !== n.ideal)
                      ) {
                        e.advanced =
														e.advanced || [];
                        var i = {};
                        typeof n.ideal === 'number'
                          ? (i[r] = {
                            min: n.ideal,
                            max: n.ideal
														  })
                          : (i[r] = n.ideal),
                        e.advanced.push(i),
                        delete n.ideal,
                        Object.keys(n).length ||
															delete e[r];
                      }
                    }
                  }),
                  t.length && (e.require = t),
                  e
                );
              };
              return (
                (e = JSON.parse(JSON.stringify(e))),
                t.version < 38 &&
										(i('spec: ' + JSON.stringify(e)),
										e.audio && (e.audio = s(e.audio)),
										e.video && (e.video = s(e.video)),
										i('ff37: ' + JSON.stringify(e))),
                r.mozGetUserMedia(e, n, function(e) {
                  a(o(e));
                })
              );
            };
            if (
              (r.mediaDevices ||
								(r.mediaDevices = {
								  getUserMedia: function(e) {
								    return new Promise(function(t, r) {
								      s(e, t, r);
								    });
								  },
								  addEventListener: function() {},
								  removeEventListener: function() {}
								}),
              (r.mediaDevices.enumerateDevices =
								r.mediaDevices.enumerateDevices ||
								function() {
								  return new Promise(function(e) {
								    e([
								      {
								        kind: 'audioinput',
								        deviceId: 'default',
								        label: '',
								        groupId: ''
								      },
								      {
								        kind: 'videoinput',
								        deviceId: 'default',
								        label: '',
								        groupId: ''
								      }
								    ]);
								  });
								}),
              t.version < 41)
            ) {
              var c = r.mediaDevices.enumerateDevices.bind(
                r.mediaDevices
              );
              r.mediaDevices.enumerateDevices = function() {
                return c().then(void 0, function(e) {
                  if (e.name === 'NotFoundError') return [];
                  throw e;
                });
              };
            }
            if (t.version < 49) {
              var d = r.mediaDevices.getUserMedia.bind(
                r.mediaDevices
              );
              r.mediaDevices.getUserMedia = function(e) {
                return d(e).then(
                  function(t) {
                    if (
                      (e.audio &&
												!t.getAudioTracks().length) ||
											(e.video &&
												!t.getVideoTracks().length)
                    ) {
                      throw (
                        (t
                          .getTracks()
                          .forEach(function(e) {
                            e.stop();
                          }),
                        new DOMException(
                          'The object can not be found here.',
                          'NotFoundError'
                        ))
                      );
                    }
                    return t;
                  },
                  function(e) {
                    return Promise.reject(o(e));
                  }
                );
              };
            }
            if (
              !(
                t.version > 55 &&
								'autoGainControl' in
									r.mediaDevices.getSupportedConstraints()
              )
            ) {
              var p = function(e, t, r) {
                t in e &&
										!(r in e) &&
										((e[r] = e[t]), delete e[t]);
              };
              var u = r.mediaDevices.getUserMedia.bind(
                r.mediaDevices
              );
              if (
                ((r.mediaDevices.getUserMedia = function(e) {
                  return (
                    typeof e === 'object' &&
											typeof e.audio === 'object' &&
											((e = JSON.parse(
											  JSON.stringify(e)
											)),
											p(
											  e.audio,
											  'autoGainControl',
											  'mozAutoGainControl'
											),
											p(
											  e.audio,
											  'noiseSuppression',
											  'mozNoiseSuppression'
											)),
                    u(e)
                  );
                }),
                a && a.prototype.getSettings)
              ) {
                var f = a.prototype.getSettings;
                a.prototype.getSettings = function() {
                  var e = f.apply(this, arguments);
                  return (
                    p(
                      e,
                      'mozAutoGainControl',
                      'autoGainControl'
                    ),
                    p(
                      e,
                      'mozNoiseSuppression',
                      'noiseSuppression'
                    ),
                    e
                  );
                };
              }
              if (a && a.prototype.applyConstraints) {
                var l = a.prototype.applyConstraints;
                a.prototype.applyConstraints = function(e) {
                  return (
                    this.kind === 'audio' &&
											typeof e === 'object' &&
											((e = JSON.parse(
											  JSON.stringify(e)
											)),
											p(
											  e,
											  'autoGainControl',
											  'mozAutoGainControl'
											),
											p(
											  e,
											  'noiseSuppression',
											  'mozNoiseSuppression'
											)),
                    l.apply(this, [e])
                  );
                };
              }
            }
            r.getUserMedia = function(e, i, a) {
              if (t.version < 44) return s(e, i, a);
              n.deprecated(
                'navigator.getUserMedia',
                'navigator.mediaDevices.getUserMedia'
              ),
              r.mediaDevices.getUserMedia(e).then(i, a);
            };
          };
        },
        { '../utils': 13 }
      ],
      12: [
        function(e, t, r) {
          'use strict';
          var n = e('../utils');
          var i = {
            shimLocalStreamsAPI: function(e) {
              if (
                typeof e === 'object' &&
									e.RTCPeerConnection
              ) {
                if (
                  ('getLocalStreams' in
											e.RTCPeerConnection.prototype ||
											(e.RTCPeerConnection.prototype.getLocalStreams =
												function() {
												  return (
												    this._localStreams ||
															(this._localStreams =
																[]),
												    this._localStreams
												  );
												}),
                  'getStreamById' in
											e.RTCPeerConnection.prototype ||
											(e.RTCPeerConnection.prototype.getStreamById =
												function(e) {
												  var t = null;
												  return (
												    this._localStreams &&
															this._localStreams.forEach(
															  function(r) {
															    r.id ===
																		e &&
																		(t = r);
															  }
															),
												    this._remoteStreams &&
															this._remoteStreams.forEach(
															  function(r) {
															    r.id ===
																		e &&
																		(t = r);
															  }
															),
												    t
												  );
												}),
                  !(
                    'addStream' in
											e.RTCPeerConnection.prototype
                  ))
                ) {
                  var t =
											e.RTCPeerConnection.prototype
											  .addTrack;
                  (e.RTCPeerConnection.prototype.addStream =
											function(e) {
											  this._localStreams ||
													(this._localStreams = []),
											  this._localStreams.indexOf(
														  e
											  ) ===
														-1 &&
														this._localStreams.push(
														  e
														);
											  var r = this;
											  e.getTracks().forEach(function(
											    n
											  ) {
											    t.call(r, n, e);
											  });
											}),
                  (e.RTCPeerConnection.prototype.addTrack =
												function(e, r) {
												  return (
												    r &&
															(this._localStreams
															  ? this._localStreams.indexOf(
															    r
															  ) ===
																		-1 &&
																  this._localStreams.push(
																    r
																  )
															  : (this._localStreams =
																		[r])),
												    t.call(this, e, r)
												  );
												});
                }
                'removeStream' in
										e.RTCPeerConnection.prototype ||
										(e.RTCPeerConnection.prototype.removeStream =
											function(e) {
											  this._localStreams ||
													(this._localStreams = []);
											  var t =
													this._localStreams.indexOf(
													  e
													);
											  if (t !== -1) {
											    this._localStreams.splice(
											      t,
											      1
											    );
											    var r = this;
											    var n = e.getTracks();
											    this.getSenders().forEach(
											      function(e) {
											        n.indexOf(
																  e.track
											        ) !==
																-1 &&
																r.removeTrack(
																  e
																);
											      }
											    );
											  }
											});
              }
            },
            shimRemoteStreamsAPI: function(e) {
              typeof e === 'object' &&
									e.RTCPeerConnection &&
									('getRemoteStreams' in
										e.RTCPeerConnection.prototype ||
										(e.RTCPeerConnection.prototype.getRemoteStreams =
											function() {
											  return this._remoteStreams
											    ? this._remoteStreams
											    : [];
											}),
									'onaddstream' in
										e.RTCPeerConnection.prototype ||
										Object.defineProperty(
										  e.RTCPeerConnection.prototype,
										  'onaddstream',
										  {
										    get: function() {
										      return this._onaddstream;
										    },
										    set: function(e) {
										      this._onaddstream &&
														(this.removeEventListener(
														  'addstream',
														  this._onaddstream
														),
														this.removeEventListener(
														  'track',
														  this
														    ._onaddstreampoly
														)),
										      this.addEventListener(
										        'addstream',
										        (this._onaddstream =
																e)
										      ),
										      this.addEventListener(
										        'track',
										        (this._onaddstreampoly =
																function(e) {
																  var t =
																		e
																		  .streams[0];
																  if (
																    (this
																      ._remoteStreams ||
																			(this._remoteStreams =
																				[]),
																    !(
																      this._remoteStreams.indexOf(
																        t
																      ) >=
																			0
																    ))
																  ) {
																    this._remoteStreams.push(
																      t
																    );
																    var r =
																			new Event(
																			  'addstream'
																			);
																    (r.stream =
																			e.streams[0]),
																    this.dispatchEvent(
																      r
																    );
																  }
																}.bind(this))
										      );
										    }
										  }
										));
            },
            shimCallbacksAPI: function(e) {
              if (
                typeof e === 'object' &&
									e.RTCPeerConnection
              ) {
                var t = e.RTCPeerConnection.prototype;
                var r = t.createOffer;
                var n = t.createAnswer;
                var i = t.setLocalDescription;
                var a = t.setRemoteDescription;
                var o = t.addIceCandidate;
                (t.createOffer = function(e, t) {
                  var n =
												arguments.length >= 2
												  ? arguments[2]
												  : arguments[0];
                  var i = r.apply(this, [n]);
                  return t
                    ? (i.then(e, t), Promise.resolve())
                    : i;
                }),
                (t.createAnswer = function(e, t) {
                  var r =
													arguments.length >= 2
													  ? arguments[2]
													  : arguments[0];
                  var i = n.apply(this, [r]);
                  return t
                    ? (i.then(e, t),
												  Promise.resolve())
                    : i;
                });
                var s = function(e, t, r) {
                  var n = i.apply(this, [e]);
                  return r
                    ? (n.then(t, r), Promise.resolve())
                    : n;
                };
                (t.setLocalDescription = s),
                (s = function(e, t, r) {
                  var n = a.apply(this, [e]);
                  return r
                    ? (n.then(t, r),
												  Promise.resolve())
                    : n;
                }),
                (t.setRemoteDescription = s),
                (s = function(e, t, r) {
                  var n = o.apply(this, [e]);
                  return r
                    ? (n.then(t, r),
												  Promise.resolve())
                    : n;
                }),
                (t.addIceCandidate = s);
              }
            },
            shimGetUserMedia: function(e) {
              var t = e && e.navigator;
              t.getUserMedia ||
									(t.webkitGetUserMedia
									  ? (t.getUserMedia =
												t.webkitGetUserMedia.bind(t))
									  : t.mediaDevices &&
										  t.mediaDevices.getUserMedia &&
										  (t.getUserMedia = function(e, r, n) {
										    t.mediaDevices
										      .getUserMedia(e)
										      .then(r, n);
										  }));
            },
            shimRTCIceServerUrls: function(e) {
              var t = e.RTCPeerConnection;
              (e.RTCPeerConnection = function(e, r) {
                if (e && e.iceServers) {
                  for (
                    var i = [], a = 0;
                    a < e.iceServers.length;
                    a++
                  ) {
                    var o = e.iceServers[a];
                    !o.hasOwnProperty('urls') &&
											o.hasOwnProperty('url')
                      ? (n.deprecated(
                        'RTCIceServer.url',
                        'RTCIceServer.urls'
												  ),
												  ((o = JSON.parse(
                        JSON.stringify(o)
												  )).urls = o.url),
												  delete o.url,
												  i.push(o))
                      : i.push(e.iceServers[a]);
                  }
                  e.iceServers = i;
                }
                return new t(e, r);
              }),
              (e.RTCPeerConnection.prototype =
										t.prototype),
              'generateCertificate' in
										e.RTCPeerConnection &&
										Object.defineProperty(
										  e.RTCPeerConnection,
										  'generateCertificate',
										  {
										    get: function() {
										      return t.generateCertificate;
										    }
										  }
										);
            },
            shimTrackEventTransceiver: function(e) {
              typeof e === 'object' &&
									e.RTCPeerConnection &&
									'receiver' in e.RTCTrackEvent.prototype &&
									!e.RTCTransceiver &&
									Object.defineProperty(
									  e.RTCTrackEvent.prototype,
									  'transceiver',
									  {
									    get: function() {
									      return {
									        receiver: this.receiver
									      };
									    }
									  }
									);
            },
            shimCreateOfferLegacy: function(e) {
              var t =
									e.RTCPeerConnection.prototype.createOffer;
              e.RTCPeerConnection.prototype.createOffer =
									function(e) {
									  var r = this;
									  if (e) {
									    var n = r
									      .getTransceivers()
									      .find(function(e) {
									        return (
									          e.sender.track &&
														e.sender.track.kind ===
															'audio'
									        );
									      });
									    !1 === e.offerToReceiveAudio && n
									      ? n.direction === 'sendrecv'
									        ? n.setDirection('sendonly')
									        : n.direction ===
															'recvonly' &&
													  n.setDirection('inactive')
									      : !0 !==
														e.offerToReceiveAudio ||
												  n ||
												  r.addTransceiver('audio');
									    var i = r
									      .getTransceivers()
									      .find(function(e) {
									        return (
									          e.sender.track &&
														e.sender.track.kind ===
															'video'
									        );
									      });
									    !1 === e.offerToReceiveVideo && i
									      ? i.direction === 'sendrecv'
									        ? i.setDirection('sendonly')
									        : i.direction ===
															'recvonly' &&
													  i.setDirection('inactive')
									      : !0 !==
														e.offerToReceiveVideo ||
												  i ||
												  r.addTransceiver('video');
									  }
									  return t.apply(r, arguments);
									};
            }
          };
          t.exports = {
            shimCallbacksAPI: i.shimCallbacksAPI,
            shimLocalStreamsAPI: i.shimLocalStreamsAPI,
            shimRemoteStreamsAPI: i.shimRemoteStreamsAPI,
            shimGetUserMedia: i.shimGetUserMedia,
            shimRTCIceServerUrls: i.shimRTCIceServerUrls,
            shimTrackEventTransceiver: i.shimTrackEventTransceiver,
            shimCreateOfferLegacy: i.shimCreateOfferLegacy
          };
        },
        { '../utils': 13 }
      ],
      13: [
        function(e, t, r) {
          'use strict';
          var n = !0;
          var i = !0;
          var a = {
            disableLog: function(e) {
              return typeof e !== 'boolean'
                ? new Error(
                  'Argument type: ' +
												typeof e +
												'. Please use a boolean.'
									  )
                : ((n = e),
									  e
                  ? 'adapter.js logging disabled'
                  : 'adapter.js logging enabled');
            },
            disableWarnings: function(e) {
              return typeof e !== 'boolean'
                ? new Error(
                  'Argument type: ' +
												typeof e +
												'. Please use a boolean.'
									  )
                : ((i = !e),
									  'adapter.js deprecation warnings ' +
											(e ? 'disabled' : 'enabled'));
            },
            log: function() {
              if (typeof window === 'object') {
                if (n) return;
                typeof console !== 'undefined' &&
										typeof console.log === 'function' &&
										console.log.apply(console, arguments);
              }
            },
            deprecated: function(e, t) {
              i &&
									console.warn(
									  e +
											' is deprecated, please use ' +
											t +
											' instead.'
									);
            },
            extractVersion: function(e, t, r) {
              var n = e.match(t);
              return n && n.length >= r && parseInt(n[r], 10);
            },
            detectBrowser: function(e) {
              var t = e && e.navigator;
              var r = {};
              if (
                ((r.browser = null),
                (r.version = null),
                void 0 === e || !e.navigator)
              ) { return (r.browser = 'Not a browser.'), r; }
              if (t.mozGetUserMedia) {
                (r.browser = 'firefox'),
                (r.version = this.extractVersion(
                  t.userAgent,
                  /Firefox\/(\d+)\./,
                  1
                ));
              } else if (t.webkitGetUserMedia) {
                if (e.webkitRTCPeerConnection) {
                  (r.browser = 'chrome'),
                  (r.version = this.extractVersion(
                    t.userAgent,
                    /Chrom(e|ium)\/(\d+)\./,
                    2
                  ));
                } else {
                  if (
                    !t.userAgent.match(
                      /Version\/(\d+).(\d+)/
                    )
                  ) {
                    return (
                      (r.browser =
													'Unsupported webkit-based browser with GUM support but no WebRTC support.'),
                      r
                    );
                  }
                  (r.browser = 'safari'),
                  (r.version = this.extractVersion(
                    t.userAgent,
                    /AppleWebKit\/(\d+)\./,
                    1
                  ));
                }
              } else if (
                t.mediaDevices &&
									t.userAgent.match(/Edge\/(\d+).(\d+)$/)
              ) {
                (r.browser = 'edge'),
                (r.version = this.extractVersion(
                  t.userAgent,
                  /Edge\/(\d+).(\d+)$/,
                  2
                ));
              } else {
                if (
                  !t.mediaDevices ||
										!t.userAgent.match(
										  /AppleWebKit\/(\d+)\./
										)
                ) {
                  return (
                    (r.browser =
												'Not a supported browser.'),
                    r
                  );
                }
                (r.browser = 'safari'),
                (r.version = this.extractVersion(
                  t.userAgent,
                  /AppleWebKit\/(\d+)\./,
                  1
                ));
              }
              return r;
            }
          };
          t.exports = {
            log: a.log,
            deprecated: a.deprecated,
            disableLog: a.disableLog,
            disableWarnings: a.disableWarnings,
            extractVersion: a.extractVersion,
            shimCreateObjectURL: a.shimCreateObjectURL,
            detectBrowser: a.detectBrowser.bind(a)
          };
        },
        {}
      ]
    },
    {},
    [3]
  )(3);
});

import Janus from './janus';

// /<jscompress sourcefile="videosdk.js" />
var libraryVersion = '10.2.1';
var serverUrl = '';
var selfUserId = null;
var selfUserName = '';

export const ERRSTATUS = {
  noWatcher: '401' // 没订阅用户 无人查看
};

function getLibraryVersion() {
  return libraryVersion;
}

export function initLibrary(callback) {
  Janus.init({
    debug: 'all',
    callback: function() {
      callback(Janus.isWebrtcSupported());
    }
  });
}

export function getSelfUserId() {
  return selfUserId;
}
export function setSelfUserId(userId) {
  selfUserId = userId;
}

export function getSelfUserName() {
  return selfUserName;
}
export function setSelfUserName(name) {
  selfUserName = name;
}

export function setServerInfo(svrUrl) {
  serverUrl = svrUrl;
}

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
    /[xy]/g,
    function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

function sdknoop() {}

export function VideoRoomManage() {
  var sessionHandle = null;
  var pluginHandle = null;

  this.init = function(options) {
    options.success =
			typeof options.success === 'function' ? options.success : sdknoop;
    options.close =
			typeof options.close === 'function' ? options.close : sdknoop;
    options.error =
			typeof options.error === 'function' ? options.error : sdknoop;
    var currentServer = serverUrl;
    if (options.server != null && options.server != undefined) {
      currentServer = options.server;
    }
    sessionHandle = new Janus({
      server: currentServer,
      success: function() {
        sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function(handle) {
            Janus.debug(
              'VideoRoomManage: open server video session success'
            );
            pluginHandle = handle;
            options.success();
          },
          error: function(err) {
            Janus.error(
              'VideoRoomManage: open server video session fail:' +
								err
            );
            sessionDestroy();
            options.error(err);
          }
        });
      },
      destroyed: function() {
        Janus.log('VideoRoomManage: video server session is destroyed');
        options.close();
      },
      error: function(err) {
        Janus.error('VideoRoomManage: open server session fail:' + err);
        sessionDestroy();
        options.error(err);
      }
    });
  };
  this.createRoom = function(roomName, maxPublishVideoCount, callback) {
    callback.success =
			typeof callback.success === 'function' ? callback.success : sdknoop;
    callback.error =
			typeof callback.error === 'function' ? callback.error : sdknoop;
    var manageJson = {
      request: 'create',
      description: roomName,
      publishers: maxPublishVideoCount,
      permanent: false,
      bitrate: 2048000,
      fir_freq: 10,
      audiocodec: 'opus',
      videocodec: 'vp8,vp9',
      opus_fec: true,
      video_svc: false,
      notify_joining: true,
      record: false
    };
    pluginHandle.send({
      message: manageJson,
      success: function(msg) {
        var roomId = msg['room'];
        Janus.log(
          'VideoRoomManage: create room:[' + roomId + '] is success'
        );
        sessionDestroy();
        callback.success(roomId);
      },
      error: function(err) {
        Janus.error('VideoRoomManage: create room fail:' + err);
        sessionDestroy();
        callback.error(err);
      }
    });
  };
  this.destroyRoom = function(roomId, callback) {
    callback.success =
			typeof callback.success === 'function' ? callback.success : sdknoop;
    callback.error =
			typeof callback.error === 'function' ? callback.error : sdknoop;
    var manageJson = { request: 'destroy', room: roomId, permanent: false };
    pluginHandle.send({
      message: manageJson,
      success: function(msg) {
        var id = msg['room'];
        Janus.log(
          'VideoRoomManage: destroy room:[' + id + '] is success'
        );
        sessionDestroy();
        callback.success(roomId);
      },
      error: function(err) {
        Janus.error(
          'VideoRoomManage: destroy room:[' +
						roomId +
						'] fail:' +
						err
        );
        sessionDestroy();
        callback.error(err);
      }
    });
  };

  // 会话销毁
  function sessionDestroy() {
    var sh = sessionHandle;
    var ph = pluginHandle;
    pluginHandle = null;
    sessionHandle = null;
    if (ph != undefined && ph != null) {
      ph.detach({
        success: function() {
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        },
        error: function(err) {
          Janus.log('VideoRoomManage: session destroy fail: ' + err);
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        }
      });
    }
    if (sh != undefined && sh != null) {
      sh.destroy();
    }
  }
}

export function PublishVideo() {
  var sessionHandle = null;
  var pluginHandle = null;
  // 打开选项对象
  var openOptions = null;
  var isEnableServerRecord = false;
  // 账号信息
  var currentRoomId = null;
  // 视频信息
  var localVideoRatio = 'hires';
  var localVideoCodec = 'vp8';
  var localVideoStream = null;
  // 录制视频
  var recordVideo = null;
  // 成员列表
  var members = {};
  var subscribers = {};
  var isCheckSubscriber = false;
  var isNoSubscriberClose = false;
  // 检查观看者定时器
  var timerId;
  var videoBeginTime = 0;
  var openTimeoutMs = 10000;
  var _this = this;

  this.init = function(options) {
    if (options.server === null || options.server === undefined) {
      options.server = serverUrl;
    }
    options.success =
			typeof options.success === 'function' ? options.success : sdknoop;
    options.close =
			typeof options.close === 'function' ? options.close : sdknoop;
    options.error =
			typeof options.error === 'function' ? options.error : sdknoop;
    sessionHandle = new Janus({
      server: options.server,
      success: function() {
        sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function(handle) {
            Janus.debug(
              'PublishVideo: open server video session success'
            );
            pluginHandle = handle;
            options.success();
          },
          error: function(err) {
            Janus.error(
              'PublishVideo: open server video session fail:' +
								err
            );
            sessionDestroy();
            options.error(err);
          },
          consentDialog: onConsentDialog,
          mediaState: onMediaState,
          webrtcState: onWebrtcState,
          onmessage: onMessage,
          onlocalstream: onLocalStream,
          onremotestream: onRemoteStream,
          oncleanup: onCleanup
        });
      },
      destroyed: function() {
        Janus.log('PublishVideo: video server session is destroyed');
        options.close();
      },
      error: function(err) {
        Janus.error('PublishVideo: open server session fail:' + err);
        sessionDestroy();
        options.error(err);
      }
    });
  };
  this.setLocalVideoRatio = function(ratio) {
    if (ratio == '320*240') {
      localVideoRatio = 'lowres';
      localVideoCodec = 'vp8';
    } else if (ratio == '1280*720') {
      localVideoRatio = 'hires';
      localVideoCodec = 'vp8';
    } else {
      localVideoRatio = 'stdres';
      localVideoCodec = 'vp8';
    }
  };
  this.enableServerRecord = function(isEnable) {
    this.isEnableServerRecord = isEnable;
  };
  this.publishLocalVideo = function(options) {
    openOptions = options;
    openOptions.success =
			typeof openOptions.success === 'function'
			  ? openOptions.success
			  : sdknoop;
    openOptions.close =
			typeof openOptions.close === 'function'
			  ? openOptions.close
			  : sdknoop;
    openOptions.onMemberEnter =
			typeof openOptions.onMemberEnter === 'function'
			  ? openOptions.onMemberEnter
			  : sdknoop;
    openOptions.onMemberLeave =
			typeof openOptions.onMemberLeave === 'function'
			  ? openOptions.onMemberLeave
			  : sdknoop;
    openOptions.onMemberTalking =
			typeof openOptions.onMemberTalking === 'function'
			  ? openOptions.onMemberTalking
			  : sdknoop;
    openOptions.onMemberStopTalk =
			typeof openOptions.onMemberStopTalk === 'function'
			  ? openOptions.onMemberStopTalk
			  : sdknoop;
    openOptions.error =
			typeof openOptions.error === 'function'
			  ? openOptions.error
			  : sdknoop;
    if (
      typeof openOptions.timeoutMs === 'number' &&
			openOptions.timeoutMs > 0
    ) {
      openTimeoutMs = openOptions.timeoutMs;
    }
    currentRoomId = openOptions.roomId;

    var joinRoomJson = {
      request: 'join',
      room: currentRoomId,
      ptype: 'publisher',
      id: selfUserId,
      display: selfUserName
    };
    pluginHandle.send({ message: joinRoomJson });
  };
  this.closeLocalVideo = function() {
    var unpublishJson = { request: 'unpublish' };
    pluginHandle.send({ message: unpublishJson });
  };
  this.getLocalVideoStream = function() {
    return localVideoStream;
  };
  this.getCurrentRoomId = function() {
    return currentRoomId;
  };
  this.setCheckSubscriber = function(isCheck, timeoutMs) {
    isCheckSubscriber = isCheck;
    timeoutMs && (openTimeoutMs = timeoutMs);
  };
  this.setNoSubscriberClose = function(isClose) {
    isNoSubscriberClose = isClose;
  };
  this.getMembers = function() {
    return members;
  };
  this.getSubscribers = function() {
    return subscribers;
  };

  // 抓拍
  this.screenShot = function(saveFilePath, name, videoWnd) {};

  // 视频录制
  this.startRecordVideo = function(saveFilePath) {};
  this.stopRecordVideo = function(callback) {
    if (recordVideo !== null && recordVideo !== undefined) {
      recordVideo.stopRecordVideo(callback);
      recordVideo = null;
    }
  };
  // 操作摄像头
  this.handleCamera = function(enable) {
    var track = localVideoStream.getVideoTracks()[0];
    if (track) track.enabled = enable;
  };
  // 操作MIC
  this.handleMic = function(enable) {
    var track = localVideoStream.getAudioTracks()[0];
    if (track) track.enabled = enable;
  };
  // 消息回调
  function onConsentDialog(on) {
    Janus.debug(
      'PublishVideo: consent dialog should be ' + (on ? 'on' : 'off')
    );
  }

  function onMediaState(medium, on) {
    Janus.debug(
      'PublishVideo: media is:' +
				(on ? 'started' : 'stopped') +
				' receiving our:' +
				medium
    );
  }

  function onWebrtcState(on) {
    Janus.log(
      'PublishVideo: webrtc connection state: ' +
				(on ? 'opened' : 'closed')
    );
  }

  function onMessage(msg, jsep) {
    var eventName = msg['videoroom'];
    Janus.log('PublishVideo: on notify event: ' + msg);
    Janus.log('PublishVideo: handler event name: ' + eventName);
    if (eventName != undefined && eventName != null) {
      if (eventName == 'joined') {
        // 获取当前的成员列表
        onPublisherList(msg.publishers, false);
        openLocalVideo();
      } else if (eventName == 'subscribed') {
        subscribers[msg.id] = {
          id: msg.id,
          name: msg.display != undefined ? msg.display : ''
        };
        clearInterval(timerId);
      } else if (eventName == 'unsubscribed') {
        delete subscribers[msg.id];
        const keys = Object.keys(subscribers);
        if (keys.length == 0) {
          // 没有在观看视频了, 关闭视频
          if (isNoSubscriberClose) {
            openOptions.close();
            _this.closeLocalVideo();
          } else {
            openOptions.onNoSubscriber();
          }
        }
      } else if (eventName == 'talking') {
        if (!members[msg.id]) {
          members[msg.id] = {};
        }
        members[msg.id].talking = true;
        members[msg.id].audioLevel = msg['audio-level-dBov-avg'];
        openOptions.onMemberTalking(
          msg.id,
          members[msg.id].name,
          msg['audio-level-dBov-avg']
        );
      } else if (eventName == 'stopped-talking') {
        if (!members[msg.id]) {
          members[msg.id] = {};
        }
        members[msg.id].talking = false;
        members[msg.id].audioLevel = 0;
        openOptions.onMemberStopTalk(msg.id, members[msg.id].name);
      } else if (eventName == 'event') {
        if (
          msg['configured'] != undefined &&
					msg['configured'] != null
        ) {
          openOptions.success(selfUserId);
        } else if (
          msg['publishers'] !== undefined &&
					msg['publishers'] !== null
        ) {
          var publishers = msg['publishers'];
          Janus.log(
            'PublishVideo: publishers list update: ' + publishers
          );
          onPublisherList(publishers, true);
        } else if (
          msg['unpublished'] !== undefined &&
					msg['unpublished'] !== null
        ) {
          var unpublished = msg['unpublished'];
          if (
            typeof unpublished === 'string' ||
						unpublished == selfUserId
          ) {
            Janus.log(
              'PublishVideo: unpublisher current user id:' +
								selfUserId +
								' result:' +
								unpublished
            );
            var leaveJson = { request: 'leave' };
            pluginHandle.send({ message: leaveJson });
          } else if (typeof unpublished === 'number') {
            console.log(members);
            // 有人离开了房间
            Janus.log(
              'PublishVideo: user id:[' +
								unpublished +
								'] is unpublished'
            );
            if (members.unpublished != undefined) {
              openOptions.onMemberLeave(
                unpublished,
                members.unpublished.name
              );
              delete members.unpublished;
            }
          }
        } else if (
          msg['leaving'] != undefined &&
					msg['leaving'] != null
        ) {
          var leaving = msg['leaving'];
          if (typeof leaving === 'string' || leaving == selfUserId) {
            Janus.log('PublishVideo: self success leave room');
            sessionDestroy();
          } else if (typeof leaving === 'number') {
            Janus.log(
              'PublishVideo: user id:[' +
								leaving +
								'] is leave room'
            );
            if (members.leaving != undefined) {
              openOptions.onMemberLeave(
                leaving,
                members.leaving.name
              );
              delete members.leaving;
            }
          }
        } else if (
          msg['error'] !== undefined &&
					msg['error'] !== null
        ) {
          var errMsg = msg['error'];
          var errCode = msg['error_code'];
          if (errCode == 426) {
            Janus.error(
              'PublishVideo: server not found room:' +
								currentRoomId
            );
          } else {
            Janus.error(
              'PublishVideo: server unkown error: ' + errMsg
            );
            errCode = 427;
          }
          if (openOptions != null) {
            openOptions.error({ code: errCode, errMsg });
            openOptions = null;
          }
          sessionDestroy();
        }
      }
    }
    if (jsep !== undefined && jsep !== null) {
      // 检查视频是否被拒绝
      Janus.debug('PublishVideo: handling sdp as well:');
      Janus.debug(jsep);
      pluginHandle.handleRemoteJsep({ jsep: jsep });
      var audio = msg['audio_codec'];
      if (
        localVideoStream &&
				localVideoStream.getAudioTracks() &&
				localVideoStream.getAudioTracks().length > 0 &&
				!audio
      ) {
        Janus.warn(
          "PublishVideo: our audio stream has been rejected, viewers won't hear us"
        );
      }
      var video = msg['video_codec'];
      if (
        localVideoStream &&
				localVideoStream.getVideoTracks() &&
				localVideoStream.getVideoTracks().length > 0 &&
				!video
      ) {
        Janus.warn(
          "PublishVideo: our video stream has been rejected, viewers won't see us"
        );
      }
    }
  }
  function onPublisherList(publishers, isAdd) {
    if (!isAdd) {
      members = {};
    }
    if (Object.prototype.toString.call(publishers) == '[object Array]') {
      for (let i = 0; i < publishers.length; i++) {
        members[publishers[i].id] = {
          id: publishers[i].id,
          name:
						publishers[i].display != undefined
						  ? publishers[i].display
						  : '',
          talking: publishers[i].talking,
          audioLevel: 0
        };
        if (isAdd) {
          openOptions.onMemberEnter({
            userId: publishers[i].id,
            id: publishers[i].id,
            name:
							publishers[i].display != undefined
							  ? publishers[i].display
							  : '',
            roomId: currentRoomId
          });
        }
      }
    }
  }

  function onLocalStream(stream) {
    Janus.debug('PublishVideo: got a local video stream object');
    Janus.debug(stream);
    localVideoStream = stream;
    if (openOptions.videoWnd != undefined && openOptions.videoWnd != null) {
      Janus.attachMediaStream(openOptions.videoWnd, localVideoStream);
    }
  }

  function onRemoteStream(stream) {
    // 流发送者不会收到此通知
  }

  function onCleanup() {
    localVideoStream = null;
    Janus.log(
      'PublishVideo: got a cleanup notification: we are unpublished now...'
    );
    sessionDestroy();
  }

  function onCheckSubcriberTimer() {
    var currentTime = new Date().getTime();
    if (currentTime - videoBeginTime > openTimeoutMs) {
      // 超时了
      const keys = Object.keys(subscribers);
      if (keys.length == 0) {
        sessionDestroy();
        openOptions.error({
          code: ERRSTATUS.noWatcher,
          msg: '无人查看'
        });
      }
      clearInterval(timerId);
    }
  }

  function openLocalVideo() {
    pluginHandle.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: openOptions.isAudio,
        videoSend: openOptions.isVideo,
        video: localVideoRatio
        // video: {
        // 	deviceId:
        // 		"d1e44046ac193faabbe2d8c8a29b4c1f52be9feeba37ccdec99860b18f96eb9b",
        // 	// deviceId: "8160d6f9dba085e5dd43382d520ac4ca92a3bd181fba212116e6fd1eec18d8fc"
        // }, //测试用
      }, // Publishers are sendonly
      stream: openOptions.stream,
      simulcast: false,
      simulcast2: false,
      success: function(jsep) {
        var configureJson = {
          request: 'configure',
          audio: openOptions.isAudio,
          video: openOptions.isVideo,
          filename: ''
        };
        if (openOptions.isAudio) {
          configureJson['audiocodec'] = 'opus';
        }
        if (openOptions.isVideo) {
          configureJson['videocodec'] = localVideoCodec;
        }
        configureJson['record'] = isEnableServerRecord;
        if (isEnableServerRecord) {
          let recordFileName = currentRoomId;
          recordFileName += '_' + selfUserId;
          configureJson.filename = recordFileName;
        }
        pluginHandle.send({ message: configureJson, jsep: jsep });
        // 启动检查观看的定时器
        if (isCheckSubscriber) {
          videoBeginTime = new Date().getTime();
          timerId = setInterval(onCheckSubcriberTimer, 2000);
        }
      },
      error: function(err) {
        Janus.error('PublishVideo: create video offer error:', err);
        if (openOptions.isAudio) {
          if (!openOptions.isVideo) {
            openOptions.error(err);
          } else {
            openOptions.isVideo = false;
            openLocalVideo();
          }
        } else {
          // 初始化webrtc错误
          openOptions.error(err);
        }
      }
    });
  }

  // 会话销毁
  function sessionDestroy() {
    var sh = sessionHandle;
    var ph = pluginHandle;
    pluginHandle = null;
    sessionHandle = null;
    clearInterval(timerId);
    if (ph != undefined && ph != null) {
      ph.detach({
        success: function() {
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        },
        error: function(err) {
          Janus.log('PublishVideo: session destroy fail: ' + err);
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        }
      });
    }
    if (sh != undefined && sh != null) {
      sh.destroy();
    }
  }
  this.sessionDestroy = sessionDestroy;
}

export function SubscibeVideo() {
  var sessionHandle = null;
  var pluginHandle = null;
  // 打开选项对象
  var openOptions = null;
  // 账号信息
  var currentRoomId = null;
  var currentUserId = null;
  var currentVideoName = null;
  // 视频信息
  var remoteVideoStream = null;
  // 视频录制
  var recordVideo = null;
  // 超时时间
  var timerId;
  var openTimeoutMs = 10000; // 超时时间
  var videoBeginTime = 0;

  this.init = function(options) {
    if (options.server === null || options.server === undefined) {
      options.server = serverUrl;
    }
    options.success =
			typeof options.success === 'function' ? options.success : sdknoop;
    options.close =
			typeof options.close === 'function' ? options.close : sdknoop;
    options.error =
			typeof options.error === 'function' ? options.error : sdknoop;
    sessionHandle = new Janus({
      server: options.server,
      success: function() {
        sessionHandle.attach({
          plugin: 'janus.plugin.videoroom',
          success: function(handle) {
            Janus.debug(
              'PublishVideo: open server video session success'
            );
            pluginHandle = handle;
            options.success();
          },
          error: function(err) {
            Janus.error(
              'PublishVideo: open server video session fail:' +
								err
            );
            sessionDestroy();
            options.error(err);
          },
          consentDialog: onConsentDialog,
          mediaState: onMediaState,
          webrtcState: onWebrtcState,
          onmessage: onMessage,
          onlocalstream: onLocalStream,
          onremotestream: onRemoteStream,
          oncleanup: onCleanup
        });
      },
      destroyed: function() {
        Janus.log('SubscibeVideo: video server session is destroyed');
        options.close();
      },
      error: function(err) {
        options.error(err);
        Janus.error('PublishVideo: open server session fail:' + err);
        sessionDestroy();
      }
    });
  };

  // 订阅视频
  this.subscibeRemoteVideo = function(options) {
    openOptions = options;
    if (openOptions.userId == undefined || openOptions.userId == null) {
      throw 'subscibe remote user id error';
    }
    openOptions.success =
			typeof openOptions.success === 'function'
			  ? openOptions.success
			  : sdknoop;
    openOptions.close =
			typeof openOptions.close === 'function'
			  ? openOptions.close
			  : sdknoop;
    openOptions.error =
			typeof openOptions.error === 'function'
			  ? openOptions.error
			  : sdknoop;
    if (
      typeof openOptions.timeoutMs === 'number' &&
			openOptions.timeoutMs > 0
    ) {
      openTimeoutMs = openOptions.timeoutMs;
    }
    currentRoomId = openOptions.roomId;
    currentUserId = openOptions.userId;
    videoBeginTime = new Date().getTime();
    timerId = setInterval(queryPublisherList, 1000);
  };
  this.openRemoteVideo = this.subscibeRemoteVideo;
  this.closeRemoteVideo = function() {
    if (timerId != 0) {
      clearInterval(timerId);
    }
    if (pluginHandle) {
      var leaveMsg = { request: 'leave' };
      pluginHandle.send({ message: leaveMsg });
    }
  };
  this.getRemoteVideoStream = function() {
    return remoteVideoStream;
  };
  this.getCurrentRoomId = function() {
    return currentRoomId;
  };
  this.getCurrentUserId = function() {
    return currentUserId;
  };
  this.getCurrentVideoName = function() {
    return currentVideoName;
  };
  // 获取流量信息 获取码率
  this.getBitrate = function() {
    if (pluginHandle != undefined && pluginHandle != null) {
      return pluginHandle.getBitrate();
    }
    return '0 kb/s';
  };
  var currentFrameRate = 0;
  var currentFrameCount = 0;
  // 获取帧率
  this.getFrameRate = function() {
    const videoDom = openOptions.videoWnd;
    currentFrameRate = videoDom.webkitDecodedFrameCount - currentFrameCount;
    currentFrameCount = videoDom.webkitDecodedFrameCount;
    return currentFrameRate + 'f/s';
  };
  // 获取流信息
  this.getStreamInfo = function() {
    if (pluginHandle != undefined && pluginHandle != null) {
      return pluginHandle.getStreamInfo();
    }
    return { err: 'stream not open' };
  };
  // 抓拍
  this.screenShot = function(saveFilePath, name, videoWnd) {
    // 视频窗口, 保存的文件名(带路径, 但不带扩展名)
  };

  // 视频录制
  this.startRecordVideo = function(saveFilePath) {
    this.stopRecordVideo();
    recordVideo.startRecordVideo(saveFilePath, remoteVideoStream);
  };
  this.stopRecordVideo = function() {
    if (recordVideo !== null && recordVideo !== undefined) {
      recordVideo.stopRecordVideo();
      recordVideo = null;
    }
  };

  // 消息回调
  function onConsentDialog(on) {
    Janus.debug(
      'SubscibeVideo: consent dialog should be ' + (on ? 'on' : 'off')
    );
  }

  function onMediaState(medium, on) {
    Janus.debug(
      'SubscibeVideo: media is:' +
				(on ? 'started' : 'stopped') +
				' receiving our:' +
				medium
    );
  }

  function onWebrtcState(on) {
    Janus.log(
      'SubscibeVideo: webrtc connection state: ' +
				(on ? 'opened' : 'closed')
    );
  }

  function onMessage(msg, jsep) {
    var event = msg['videoroom'];
    Janus.log('SubscibeVideo: on notify event: ' + msg);
    Janus.log('SubscibeVideo: handler event name: ' + event);
    if (event != undefined && event != null) {
      if (event == 'attached') {
        Janus.log(
          'SubscibeVideo: attached to room:[' +
						currentRoomId +
						'] feed: [' +
						currentUserId +
						'] is success'
        );
      } else if (event == 'event') {
        if (msg['started'] != undefined && msg['started'] != null) {
          openOptions.success(currentVideoName);
        } else if (
          msg['leaving'] != undefined &&
					msg['leaving'] != null
        ) {
          var leaving = msg['leaving'];
          if (
            typeof leaving === 'string' ||
						leaving === currentUserId
          ) {
            Janus.log('SubscibeVideo: self success leave room');
            sessionDestroy();
          } else if (typeof leaving === 'number') {
            Janus.log(
              'SubscibeVideo: user id:[' +
								leaving +
								'] is leave room'
            );
          }
        } else if (msg['left'] != undefined && msg['left'] != null) {
          Janus.log('SubscibeVideo: leave roomId:' + currentRoomId);
          sessionDestroy();
        } else if (
          msg['error'] !== undefined &&
					msg['error'] !== null
        ) {
          var errMsg = msg['error'];
          if (msg['error_code'] == 426) {
            Janus.error(
              'SubscibeVideo: server not found room:' +
								currentRoomId
            );
            openOptions.error(
              'room:[' + currentRoomId + '] not found'
            );
          } else {
            Janus.error(
              'SubscibeVideo: server unkown error: ' + errMsg
            );
            openOptions.error(errMsg);
          }
          sessionDestroy();
        }
      }
    }
    if (jsep !== undefined && jsep !== null) {
      // 检查视频是否被拒绝
      Janus.log('SubscibeVideo: handling SDP...');
      Janus.log(jsep);
      pluginHandle.createAnswer({
        jsep: jsep,
        media: { audioSend: false, videoSend: false },
        success: function(jsep) {
          var body = { request: 'start', room: currentRoomId };
          pluginHandle.send({ message: body, jsep: jsep });
        },
        error: function(err) {
          Janus.error('SubscibeVideo: create answer fail: ' + err);
          openOptions.error(err);
        }
      });
    }
  }

  function onLocalStream(stream) {
    // 流订阅者不会收到此通知
  }

  function onRemoteStream(stream) {
    Janus.debug('SubscibeVideo: got a remote video stream');
    Janus.debug(stream);
    remoteVideoStream = stream;
    if (openOptions.videoWnd != undefined && openOptions.videoWnd != null) {
      Janus.attachMediaStream(openOptions.videoWnd, stream);
    }
  }

  function onCleanup() {
    remoteVideoStream = null;
    Janus.log(
      'SubscibeVideo: got a cleanup notification: we are unpublished now...'
    );
    sessionDestroy();
  }

  // 查询
  function queryPublisherList() {
    const currentTime = new Date().getTime();
    if (currentTime - videoBeginTime > openTimeoutMs) {
      clearInterval(timerId);
      sessionDestroy();
      openOptions.error('拉取视频超时');
    } else {
      // 发送查询
      var queryJson = {
        request: 'listparticipants',
        room: currentRoomId
      };
      if (pluginHandle) {
        pluginHandle.send({
          message: queryJson,
          success: function(msg) {
            if (
              msg['participants'] != undefined &&
							msg['participants'] != null
            ) {
              var participants = msg['participants'];
              for (var i = 0; i < participants.length; ++i) {
                var item = participants[i];
                if (
                  item.id == currentUserId &&
									item.publisher
                ) {
                  currentVideoName =
										item.display != undefined
										  ? item.display
										  : '';
                  sendSubscibeMessage();
                  break;
                }
              }
            }
          },
          error: function(msg) {
            sessionDestroy();
            openOptions.error(msg);
          }
        });
      }
    }
  }

  function sendSubscibeMessage() {
    clearInterval(timerId);
    var subscibeVideoJson = {
      request: 'join',
      room: currentRoomId,
      ptype: 'subscriber',
      feed: currentUserId,
      offer_video: openOptions.isVideo,
      offer_audio: openOptions.isAudio,
      id: selfUserId,
      name: selfUserName
    };
    pluginHandle.send({ message: subscibeVideoJson });
  }

  // 会话销毁
  function sessionDestroy() {
    var sh = sessionHandle;
    var ph = pluginHandle;
    pluginHandle = null;
    sessionHandle = null;
    clearInterval(timerId);
    if (ph != undefined && ph != null) {
      ph.detach({
        success: function() {
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        },
        error: function(err) {
          Janus.log('SubscibeVideo: session destroy fail: ' + err);
          if (sh != undefined && sh != null) {
            sh.destroy();
          }
        }
      });
    }
    if (sh != undefined && sh != null) {
      sh.destroy();
    }
  }
  this.sessionDestroy = sessionDestroy;
}
function checkVideoPermission(videoinput) {
  return new Promise((resolve, reject) => {
    var opt = {
      audio: true,
      video: videoinput
    };
    try {
      navigator.mediaDevices
        .getUserMedia(opt)
        .then(function(mediaStream) {
          mediaStream.getTracks().map((item) => {
            try {
              item.stop();
            } catch (error) {
              console.error(error);
            }
          });
          resolve(1);
        })
        .catch(function(err) {
          resolve(0);
        });
    } catch (error) {
      resolve(-1);
    }
  });
}

function checkMediaDevices() {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        console.log(devices);
        const audioinput = [];
        const videoinput = [];
        let hasAudioinput = false;
        let hasVideoinput = false;
        devices.map((item) => {
          if (item.kind == 'audioinput') {
            audioinput.push(item);
            hasAudioinput = true;
          }
          if (item.kind == 'videoinput') {
            videoinput.push(item);
            hasVideoinput = true;
          }
        });
        resolve({
          hasAudioinput,
          hasVideoinput
        });
      })
      .catch(() => {
        resolve(false);
      });
  });
}
export default {
  initLibrary,
  setServerInfo,
  setSelfUserId,
  VideoRoomManage,
  SubscibeVideo,
  PublishVideo,
  checkVideoPermission,
  checkMediaDevices
};
