(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./PlatwareClient/index.js":
/*!*********************************!*\
  !*** ./PlatwareClient/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core = __webpack_require__(/*! ./pwCore.js */ "./PlatwareClient/pwCore.js");
var Props = __webpack_require__(/*! ./pwDefaultProps.js */ "./PlatwareClient/pwDefaultProps.js");
var pwService = __webpack_require__(/*! ./pwService.js */ "./PlatwareClient/pwService.js");

function getLocation(data, callback) {
  data.envProps.environment.envProps['lat'] = '';
  data.envProps.environment.envProps['lon'] = '';

  var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 5000
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      try {
        data.envProps.environment.envProps['lat'] = position.coords.latitude;
        data.envProps.environment.envProps['lon'] = position.coords.longitude;
      } catch (e) {} finally {
        callAPI(data, callback);
      }
    }, function (error) {
      callAPI(data, callback);
    }, geo_options);
  } else {
    callAPI(data, callback);
  }
}

/**
 * [callAPI description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function callAPI(data, callback) {

  if (!Core.checkRegisCall()) {
    Core.clearCreds();
    pwService.callReg(data, callback);
  } else {
    if (Core.checkPropCall()) {
      // service api call
      pwService.reqToService(data, callback);
    } else {
      // property master api call
      pwService.reqToPM(data, callback);
    }
  }
}

exports.executeApi = function () {
  if (arguments.length < 3 || arguments.length > 4) {
    alert('ExecuteApi method expect three or four arguments');
  } else if (arguments.length === 3) {
    execute.call(arguments, false);
  } else if (arguments.length === 4) {
    execute.call(arguments, true);
  }
};

function execute(wH) {
  Props.setGlobalHeaders(this[0].environment.envProps);
  Props.setSecureKey(this[0].environment.envProps);
  Props.setApiType('');

  if (!navigator.onLine) {
    var fo = Props.getErrors('network').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('network').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('network').code, (fo)));
    return;
  }

  if (!(wH ? typeof this[3] === 'function' : typeof this[2] === 'function') || !(wH ? this[3].length === 1 : this[2].length === 1)) {
    alert('Callback method should be function and accepts only one argument');
    return;
  }

  if (!Core.bodyValid(this[1])) {
    var fo = Props.getErrors('bodyParam').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('bodyParam').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('bodyParam').code, (fo)));
    return;
  }

  if (!Core.headerValid(wH ? this[2] : {})) {
    var fo = Props.getErrors('headerParam').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('headerParam').code, (fo))) :
      this[2](pwService.apiRes(false, Props.getErrors('headerParam').code, (fo)));
    return;
  }
  if (Core.prepareKey('Publickey') in localStorage && Core.prepareKey('jwtToken') in localStorage) {
    if ("GUID" in localStorage) {
      var keyDec = Core.AESDec(localStorage.getItem("GUID"), Props.getSecureKey());
      if (keyDec === '') {
        var fo = Props.getErrors('guid').response;
        wH ? this[3](pwService.apiRes(false, Props.getErrors('guid').code, (fo))) :
          this[2](pwService.apiRes(false, Props.getErrors('guid').code, (fo)));
        Core.clearCredsAll();
        return;
      }
    }
  } else {
    Core.setGuid(Props.getSecureKey());
  }

  var prepareData = {
    envProps: this[0],
    header: wH ? this[2] : {},
    reqData: {
      "interfaces": {},
      "services": {}
    }
  };

  var body = this[1];
  for (var i in body) {
    prepareData.reqData.services[i] = body[i];
  }

  function setUrl(body) {
    for (var service in body) {
      if (service === 'LOGOUT') {
        prepareData.url = Props.getUrl('logout');
        return prepareData;
      } else if (service === 'AUTH_VAHANA' || service === 'AUTH') {
        prepareData.url = Props.getUrl('auth');
        Props.setApiType(service);
        return prepareData;
      } else {
        prepareData.url = Props.getUrl('');
        return prepareData;
      }
    }
  }

  function setAuthUrl(body) {
    for (var service in body) {
      prepareData.url = Props.getUrl('auth');
      Props.setApiType(service);
      return prepareData;
    }
  }
  if (prepareData.envProps['environment'].hasOwnProperty('isAuth') && prepareData.envProps['environment'].isAuth) {
    setAuthUrl(body);
  } else {
    setUrl(body);
  }

  var data = prepareData;
  /**
   * Prepare Request Data validate.
   *
   * @return {Object} The response object.
   *
   */
  if (!Core.reqValid(data)) {
    var fo = Props.getErrors('requestInvalid').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('requestInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('requestInvalid').code, (fo)));
    return;
  }

  try {
    var as = Object.keys(data.reqData.services);
    if (as.length > 5) {
      {
        var fo = Props.getErrors('serviceInvalid').response;
        wH ? this[3](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo)));
        return;
      }
    }
  } catch (e) {
    var fo = Props.getErrors('serviceInvalid').response;
    wH ? this[3](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo))) : this[2](pwService.apiRes(false, Props.getErrors('serviceInvalid').code, (fo)));
    return;
  }

  // reset default props
  Props.SetPWRequest();

  if (wH) {
    getLocation(data, this[3]);
  } else {
    getLocation(data, this[2]);
  }
}


/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/jsencrypt.1.js":
/*!******************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/jsencrypt.1.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSEncrypt = undefined;

var _asn = __webpack_require__(/*! ./lib/asn1js/asn */ "./PlatwareClient/js-encrypt/bin/lib/asn1js/asn.js");
var _hex = __webpack_require__(/*! ./lib/asn1js/hex */ "./PlatwareClient/js-encrypt/bin/lib/asn1js/hex.js");
var _base = __webpack_require__(/*! ./lib/asn1js/base64 */ "./PlatwareClient/js-encrypt/bin/lib/asn1js/base64.js");

var _rsa = __webpack_require__(/*! ./lib/jsbn/rsa2 */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa2.js");
var _rsa2 = __webpack_require__(/*! ./lib/jsbn/rsa */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa.js");
var _base2 = __webpack_require__(/*! ./lib/jsbn/base64 */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/base64.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}



/**
 * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
 * @returns {string}
 * @public
 */
_asn.ASN1.prototype.getHexStringValue = function () {
  var hexString = this.toHexString();
  var offset = this.header * 2;
  var length = this.length * 2;
  return hexString.substr(offset, length);
};

/**
 * Method to parse a pem encoded string containing both a public or private key.
 * The method will translate the pem encoded string in a der encoded string and
 * will parse private key and public key parameters. This method accepts public key
 * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
 *
 * @todo Check how many rsa formats use the same format of pkcs #1.
 *
 * The format is defined as:
 * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
 * Where AlgorithmIdentifier is:
 * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
 * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
 * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
 * it's possible to examine the structure of the keys obtained from openssl using
 * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
 * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
 * @private
 */
_rsa.RSAKey.prototype.parseKey = function (pem) {
  try {
    var modulus = 0;
    var public_exponent = 0;
    var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
    var der = reHex.test(pem) ? _hex.Hex.decode(pem) : _base.Base64.unarmor(pem);
    var asn1 = _asn.ASN1.decode(der);

    //Fixes a bug with OpenSSL 1.0+ private keys
    if (asn1.sub.length === 3) {
      asn1 = asn1.sub[2].sub[0];
    }
    if (asn1.sub.length === 9) {

      // Parse the private key.
      modulus = asn1.sub[1].getHexStringValue(); //bigint
      this.n = (0, _rsa2.parseBigInt)(modulus, 16);

      public_exponent = asn1.sub[2].getHexStringValue(); //int
      this.e = parseInt(public_exponent, 16);

      var private_exponent = asn1.sub[3].getHexStringValue(); //bigint
      this.d = (0, _rsa2.parseBigInt)(private_exponent, 16);

      var prime1 = asn1.sub[4].getHexStringValue(); //bigint
      this.p = (0, _rsa2.parseBigInt)(prime1, 16);

      var prime2 = asn1.sub[5].getHexStringValue(); //bigint
      this.q = (0, _rsa2.parseBigInt)(prime2, 16);

      var exponent1 = asn1.sub[6].getHexStringValue(); //bigint
      this.dmp1 = (0, _rsa2.parseBigInt)(exponent1, 16);

      var exponent2 = asn1.sub[7].getHexStringValue(); //bigint
      this.dmq1 = (0, _rsa2.parseBigInt)(exponent2, 16);

      var coefficient = asn1.sub[8].getHexStringValue(); //bigint
      this.coeff = (0, _rsa2.parseBigInt)(coefficient, 16);
    } else if (asn1.sub.length === 2) {

      // Parse the public key.
      var bit_string = asn1.sub[1];
      var sequence = bit_string.sub[0];

      modulus = sequence.sub[0].getHexStringValue();
      this.n = (0, _rsa2.parseBigInt)(modulus, 16);
      public_exponent = sequence.sub[1].getHexStringValue();
      this.e = parseInt(public_exponent, 16);
    } else {
      return false;
    }
    return true;
  } catch (ex) {
    return false;
  }
};

/**
 * Check if the object contains ALL the parameters of an RSA key.
 * @param {Object} [obj={}] - An object that may contain nine rsa key
 * parameters
 * @returns {boolean} true if the object contains all the parameters needed
 * @todo check for types of the parameters all the parameters but the public exponent
 * should be parseable bigint objects, the public exponent should be a parseable integer number
 * @private
 */
_rsa.RSAKey.prototype.hasPrivateKeyProperty = function (obj) {
  obj = obj || {};
  return obj.hasOwnProperty('n') && obj.hasOwnProperty('e') && obj.hasOwnProperty('d') && obj.hasOwnProperty('p') && obj.hasOwnProperty('q') && obj.hasOwnProperty('dmp1') && obj.hasOwnProperty('dmq1') && obj.hasOwnProperty('coeff');
};

/**
 * Check if the object contains the necessary parameters to populate the rsa modulus
 * and public exponent parameters.
 * @param {Object} [obj={}] - An object that may contain the two public key
 * parameters
 * @returns {boolean} true if the object contains both the modulus and the public exponent
 * properties (n and e)
 * @todo check for types of n and e. N should be a parseable bigInt object, E should
 * be a parseable integer number
 * @private
 */
_rsa.RSAKey.prototype.hasPublicKeyProperty = function (obj) {
  obj = obj || {};
  return obj.hasOwnProperty('n') && obj.hasOwnProperty('e');
};

/**
 * Parse the properties of obj in the current rsa object. Obj should AT LEAST
 * include the modulus and public exponent (n, e) parameters.
 * @param {Object} obj - the object containing rsa parameters
 * @private
 */
_rsa.RSAKey.prototype.parsePropertiesFrom = function (obj) {
  this.n = obj.n;
  this.e = obj.e;

  if (obj.hasOwnProperty('d')) {
    this.d = obj.d;
    this.p = obj.p;
    this.q = obj.q;
    this.dmp1 = obj.dmp1;
    this.dmq1 = obj.dmq1;
    this.coeff = obj.coeff;
  }
};

/**
 * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
 * This object is just a decorator for parsing the key parameter
 * @param {string|Object} key - The key in string format, or an object containing
 * the parameters needed to build a RSAKey object.
 * @constructor
 */
var JSEncryptRSAKey = function (_RSAKey) {
  _inherits(JSEncryptRSAKey, _RSAKey);

  function JSEncryptRSAKey(key) {
    _classCallCheck(this, JSEncryptRSAKey);

    // If a key key was provided.
    var _this = _possibleConstructorReturn(this, (JSEncryptRSAKey.__proto__ || Object.getPrototypeOf(JSEncryptRSAKey)).call(this));
    // Call the super constructor.


    if (key) {
      // If this is a string...
      if (typeof key === 'string') {
        _this.parseKey(key);
      } else if (_this.hasPrivateKeyProperty(key) || _this.hasPublicKeyProperty(key)) {
        // Set the values for the key.
        _this.parsePropertiesFrom(key);
      }
    }
    return _this;
  }

  return JSEncryptRSAKey;
}(_rsa.RSAKey);

/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */

var JSEncrypt = exports.JSEncrypt = function JSEncrypt(options) {
  _classCallCheck(this, JSEncrypt);

  options = options || {};
  this.default_key_size = parseInt(options.default_key_size) || 1024;
  this.default_public_exponent = options.default_public_exponent || '010001'; //65537 default openssl public exponent for rsa key type
  this.log = options.log || false;
  // The private and public key.
  this.key = null;
};

/**
 * Method to set the rsa key parameter (one method is enough to set both the public
 * and the private key, since the private key contains the public key paramenters)
 * Log a warning if logs are enabled
 * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
 * @public
 */
JSEncrypt.prototype.setKey = function (key) {
  if (this.log && this.key) {
    console.warn('A key was already set, overriding existing.');
  }
  this.key = new JSEncryptRSAKey(key);
};
/**
 * Proxy method for setKey, for api compatibility
 * @see setKey
 * @public
 */
JSEncrypt.prototype.setPublicKey = function (pubkey) {
  // Sets the public key.
  this.setKey(pubkey);
};
/**
 * Proxy method for RSAKey object's encrypt, encrypt the string using the public
 * components of the rsa key object. Note that if the object was not set will be created
 * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
 * @param {string} string the string to encrypt
 * @return {string} the encrypted string encoded in base64
 * @public
 */
JSEncrypt.prototype.encrypt = function (string) {
  // Return the encrypted string.
  try {
    return (0, _base2.hex2b64)(this.getKey().encrypt(string));
  } catch (ex) {
    return false;
  }
};

/**
 * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
 * will be created and returned
 * @param {callback} [cb] the callback to be called if we want the key to be generated
 * in an async fashion
 * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
 * @public
 */
JSEncrypt.prototype.getKey = function (cb) {
  // Only create new if it does not exist.
  if (!this.key) {
    // Get a new private key.
    this.key = new JSEncryptRSAKey();
    if (cb && {}.toString.call(cb) === '[object Function]') {
      this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
      return;
    }
    // Generate the key.
    this.key.generate(this.default_key_size, this.default_public_exponent);
  }
  return this.key;
};


/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/asn1js/asn.js":
/*!*********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/asn1js/asn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ASN.1 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
/*global oids */

var hardLimit = 100,
    ellipsis = "\u2026",
    DOM = {
    tag: function tag(tagName, className) {
        var t = document.createElement(tagName);
        t.className = className;
        return t;
    },
    text: function text(str) {
        return document.createTextNode(str);
    }
};

var Stream = function () {
    _createClass(Stream, null, [{
        key: "hexDigits",
        get: function get() {
            return "0123456789ABCDEF";
        }
    }, {
        key: "reTime",
        get: function get() {
            return (/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/
            );
        }
    }]);

    function Stream(enc, pos) {
        _classCallCheck(this, Stream);

        if (enc instanceof Stream) {
            this.enc = enc.enc;
            this.pos = enc.pos;
        } else {
            this.enc = enc;
            this.pos = pos;
        }
    }

    _createClass(Stream, [{
        key: "get",
        value: function get(pos) {
            if (pos === undefined) pos = this.pos++;
            if (pos >= this.enc.length) throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
            return this.enc[pos];
        }
    }, {
        key: "hexByte",
        value: function hexByte(b) {
            return Stream.hexDigits.charAt(b >> 4 & 0xF) + Stream.hexDigits.charAt(b & 0xF);
        }
    }, {
        key: "hexDump",
        value: function hexDump(start, end, raw) {
            var s = "";
            for (var i = start; i < end; ++i) {
                s += this.hexByte(this.get(i));
                if (raw !== true) switch (i & 0xF) {
                    case 0x7:
                        s += "  ";
                        break;
                    case 0xF:
                        s += "\n";
                        break;
                    default:
                        s += " ";
                }
            }
            return s;
        }
    }, {
        key: "parseStringISO",
        value: function parseStringISO(start, end) {
            var s = "";
            for (var i = start; i < end; ++i) {
                s += String.fromCharCode(this.get(i));
            }return s;
        }
    }, {
        key: "parseStringUTF",
        value: function parseStringUTF(start, end) {
            var s = "";
            for (var i = start; i < end;) {
                var c = this.get(i++);
                if (c < 128) s += String.fromCharCode(c);else if (c > 191 && c < 224) s += String.fromCharCode((c & 0x1F) << 6 | this.get(i++) & 0x3F);else s += String.fromCharCode((c & 0x0F) << 12 | (this.get(i++) & 0x3F) << 6 | this.get(i++) & 0x3F);
            }
            return s;
        }
    }, {
        key: "parseStringBMP",
        value: function parseStringBMP(start, end) {
            var str = "";
            for (var i = start; i < end; i += 2) {
                var high_byte = this.get(i);
                var low_byte = this.get(i + 1);
                str += String.fromCharCode((high_byte << 8) + low_byte);
            }

            return str;
        }
    }, {
        key: "parseTime",
        value: function parseTime(start, end) {
            var s = this.parseStringISO(start, end),
                m = Stream.reTime.exec(s);
            if (!m) return "Unrecognized time: " + s;
            s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
            if (m[5]) {
                s += ":" + m[5];
                if (m[6]) {
                    s += ":" + m[6];
                    if (m[7]) s += "." + m[7];
                }
            }
            if (m[8]) {
                s += " UTC";
                if (m[8] != 'Z') {
                    s += m[8];
                    if (m[9]) s += ":" + m[9];
                }
            }
            return s;
        }
    }, {
        key: "parseInteger",
        value: function parseInteger(start, end) {
            //TODO support negative numbers
            var len = end - start;
            if (len > 4) {
                len <<= 3;
                var s = this.get(start);
                if (s === 0) len -= 8;else while (s < 128) {
                    s <<= 1;
                    --len;
                }
                return "(" + len + " bit)";
            }
            var n = 0;
            for (var i = start; i < end; ++i) {
                n = n << 8 | this.get(i);
            }return n;
        }
    }, {
        key: "parseBitString",
        value: function parseBitString(start, end) {
            var unusedBit = this.get(start),
                lenBit = (end - start - 1 << 3) - unusedBit,
                s = "(" + lenBit + " bit)";
            if (lenBit <= 20) {
                var skip = unusedBit;
                s += " ";
                for (var i = end - 1; i > start; --i) {
                    var b = this.get(i);
                    for (var j = skip; j < 8; ++j) {
                        s += b >> j & 1 ? "1" : "0";
                    }skip = 0;
                }
            }
            return s;
        }
    }, {
        key: "parseOctetString",
        value: function parseOctetString(start, end) {
            var len = end - start,
                s = "(" + len + " byte) ";
            if (len > hardLimit) end = start + hardLimit;
            for (var i = start; i < end; ++i) {
                s += this.hexByte(this.get(i));
            } //TODO: also try Latin1?
            if (len > hardLimit) s += ellipsis;
            return s;
        }
    }, {
        key: "parseOID",
        value: function parseOID(start, end) {
            var s = '',
                n = 0,
                bits = 0;
            for (var i = start; i < end; ++i) {
                var v = this.get(i);
                n = n << 7 | v & 0x7F;
                bits += 7;
                if (!(v & 0x80)) {
                    // finished
                    if (s === '') {
                        var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                        s = m + "." + (n - m * 40);
                    } else s += "." + (bits >= 31 ? "bigint" : n);
                    n = bits = 0;
                }
            }
            return s;
        }
    }]);

    return Stream;
}();

var ASN1 = exports.ASN1 = function () {
    _createClass(ASN1, null, [{
        key: "reSeemsASCII",
        get: function get() {
            return (/^[ -~]+$/
            );
        }
    }]);

    function ASN1(stream, header, length, tag, sub) {
        _classCallCheck(this, ASN1);

        this.stream = stream;
        this.header = header;
        this.length = length;
        this.tag = tag;
        this.sub = sub;
    }

    _createClass(ASN1, [{
        key: "typeName",
        value: function typeName() {
            if (this.tag === undefined) return "unknown";
            var tagClass = this.tag >> 6,
                tagConstructed = this.tag >> 5 & 1,
                tagNumber = this.tag & 0x1F;
            switch (tagClass) {
                case 0:
                    // universal
                    switch (tagNumber) {
                        case 0x00:
                            return "EOC";
                        case 0x01:
                            return "BOOLEAN";
                        case 0x02:
                            return "INTEGER";
                        case 0x03:
                            return "BIT_STRING";
                        case 0x04:
                            return "OCTET_STRING";
                        case 0x05:
                            return "NULL";
                        case 0x06:
                            return "OBJECT_IDENTIFIER";
                        case 0x07:
                            return "ObjectDescriptor";
                        case 0x08:
                            return "EXTERNAL";
                        case 0x09:
                            return "REAL";
                        case 0x0A:
                            return "ENUMERATED";
                        case 0x0B:
                            return "EMBEDDED_PDV";
                        case 0x0C:
                            return "UTF8String";
                        case 0x10:
                            return "SEQUENCE";
                        case 0x11:
                            return "SET";
                        case 0x12:
                            return "NumericString";
                        case 0x13:
                            return "PrintableString"; // ASCII subset
                        case 0x14:
                            return "TeletexString"; // aka T61String
                        case 0x15:
                            return "VideotexString";
                        case 0x16:
                            return "IA5String"; // ASCII
                        case 0x17:
                            return "UTCTime";
                        case 0x18:
                            return "GeneralizedTime";
                        case 0x19:
                            return "GraphicString";
                        case 0x1A:
                            return "VisibleString"; // ASCII subset
                        case 0x1B:
                            return "GeneralString";
                        case 0x1C:
                            return "UniversalString";
                        case 0x1E:
                            return "BMPString";
                        default:
                            return "Universal_" + tagNumber.toString(16);
                    }
                case 1:
                    return "Application_" + tagNumber.toString(16);
                case 2:
                    return "[" + tagNumber + "]"; // Context
                case 3:
                    return "Private_" + tagNumber.toString(16);
            }
        }
    }, {
        key: "content",
        value: function content() {
            if (this.tag === undefined) return null;
            var tagClass = this.tag >> 6,
                tagNumber = this.tag & 0x1F,
                content = this.posContent(),
                len = Math.abs(this.length);
            if (tagClass !== 0) {
                // universal
                if (this.sub !== null) return "(" + this.sub.length + " elem)";
                //TODO: TRY TO PARSE ASCII STRING
                var s = this.stream.parseStringISO(content, content + Math.min(len, hardLimit));
                if (ASN1.reSeemsASCII.test(s)) return s.substring(0, 2 * hardLimit) + (s.length > 2 * hardLimit ? ellipsis : "");else return this.stream.parseOctetString(content, content + len);
            }
            switch (tagNumber) {
                case 0x01:
                    // BOOLEAN
                    return this.stream.get(content) === 0 ? "false" : "true";
                case 0x02:
                    // INTEGER
                    return this.stream.parseInteger(content, content + len);
                case 0x03:
                    // BIT_STRING
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len);
                case 0x04:
                    // OCTET_STRING
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len);
                //case 0x05: // NULL
                case 0x06:
                    // OBJECT_IDENTIFIER
                    return this.stream.parseOID(content, content + len);
                //case 0x07: // ObjectDescriptor
                //case 0x08: // EXTERNAL
                //case 0x09: // REAL
                //case 0x0A: // ENUMERATED
                //case 0x0B: // EMBEDDED_PDV
                case 0x10: // SEQUENCE
                case 0x11:
                    // SET
                    return "(" + this.sub.length + " elem)";
                case 0x0C:
                    // UTF8String
                    return this.stream.parseStringUTF(content, content + len);
                case 0x12: // NumericString
                case 0x13: // PrintableString
                case 0x14: // TeletexString
                case 0x15: // VideotexString
                case 0x16: // IA5String
                //case 0x19: // GraphicString
                case 0x1A:
                    // VisibleString
                    //case 0x1B: // GeneralString
                    //case 0x1C: // UniversalString
                    return this.stream.parseStringISO(content, content + len);
                case 0x1E:
                    // BMPString
                    return this.stream.parseStringBMP(content, content + len);
                case 0x17: // UTCTime
                case 0x18:
                    // GeneralizedTime
                    return this.stream.parseTime(content, content + len);
            }
            return null;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? 'null' : this.sub.length) + "]";
        }
    }, {
        key: "print",
        value: function print(indent) {
            if (indent === undefined) indent = '';
            document.writeln(indent + this);
            if (this.sub !== null) {
                indent += '  ';
                for (var i = 0, max = this.sub.length; i < max; ++i) {
                    this.sub[i].print(indent);
                }
            }
        }
    }, {
        key: "toPrettyString",
        value: function toPrettyString(indent) {
            if (indent === undefined) indent = '';
            var s = indent + this.typeName() + " @" + this.stream.pos;
            if (this.length >= 0) s += "+";
            s += this.length;
            if (this.tag & 0x20) s += " (constructed)";else if ((this.tag == 0x03 || this.tag == 0x04) && this.sub !== null) s += " (encapsulates)";
            s += "\n";
            if (this.sub !== null) {
                indent += '  ';
                for (var i = 0, max = this.sub.length; i < max; ++i) {
                    s += this.sub[i].toPrettyString(indent);
                }
            }
            return s;
        }
    }, {
        key: "toDOM",
        value: function toDOM() {
            var node = DOM.tag("div", "node");
            node.asn1 = this;
            var head = DOM.tag("div", "head");
            var s = this.typeName().replace(/_/g, " ");
            head.innerHTML = s;
            var content = this.content();
            if (content !== null) {
                content = String(content).replace(/</g, "&lt;");
                var preview = DOM.tag("span", "preview");
                preview.appendChild(DOM.text(content));
                head.appendChild(preview);
            }
            node.appendChild(head);
            this.node = node;
            this.head = head;
            var value = DOM.tag("div", "value");
            s = "Offset: " + this.stream.pos + "<br/>";
            s += "Length: " + this.header + "+";
            if (this.length >= 0) s += this.length;else s += -this.length + " (undefined)";
            if (this.tag & 0x20) s += "<br/>(constructed)";else if ((this.tag == 0x03 || this.tag == 0x04) && this.sub !== null) s += "<br/>(encapsulates)";
            //TODO if (this.tag == 0x03) s += "Unused bits: "
            if (content !== null) {
                s += "<br/>Value:<br/><b>" + content + "</b>";
                if ((typeof oids === "undefined" ? "undefined" : _typeof(oids)) === 'object' && this.tag == 0x06) {
                    var oid = oids[content];
                    if (oid) {
                        if (oid.d) s += "<br/>" + oid.d;
                        if (oid.c) s += "<br/>" + oid.c;
                        if (oid.w) s += "<br/>(warning!)";
                    }
                }
            }
            value.innerHTML = s;
            node.appendChild(value);
            var sub = DOM.tag("div", "sub");
            if (this.sub !== null) {
                for (var i = 0, max = this.sub.length; i < max; ++i) {
                    sub.appendChild(this.sub[i].toDOM());
                }
            }
            node.appendChild(sub);
            head.onclick = function () {
                node.className = node.className == "node collapsed" ? "node" : "node collapsed";
            };
            return node;
        }
    }, {
        key: "posStart",
        value: function posStart() {
            return this.stream.pos;
        }
    }, {
        key: "posContent",
        value: function posContent() {
            return this.stream.pos + this.header;
        }
    }, {
        key: "posEnd",
        value: function posEnd() {
            return this.stream.pos + this.header + Math.abs(this.length);
        }
    }, {
        key: "fakeHover",
        value: function fakeHover(current) {
            this.node.className += " hover";
            if (current) this.head.className += " hover";
        }
    }, {
        key: "fakeOut",
        value: function fakeOut(current) {
            var re = / ?hover/;
            this.node.className = this.node.className.replace(re, "");
            if (current) this.head.className = this.head.className.replace(re, "");
        }
    }, {
        key: "toHexDOM_sub",
        value: function toHexDOM_sub(node, className, stream, start, end) {
            if (start >= end) return;
            var sub = DOM.tag("span", className);
            sub.appendChild(DOM.text(stream.hexDump(start, end)));
            node.appendChild(sub);
        }
    }, {
        key: "toHexDOM",
        value: function toHexDOM(root) {
            var node = DOM.tag("span", "hex");
            if (root === undefined) root = node;
            this.head.hexNode = node;
            this.head.onmouseover = function () {
                this.hexNode.className = "hexCurrent";
            };
            this.head.onmouseout = function () {
                this.hexNode.className = "hex";
            };
            node.asn1 = this;
            node.onmouseover = function () {
                var current = !root.selected;
                if (current) {
                    root.selected = this.asn1;
                    this.className = "hexCurrent";
                }
                this.asn1.fakeHover(current);
            };
            node.onmouseout = function () {
                var current = root.selected == this.asn1;
                this.asn1.fakeOut(current);
                if (current) {
                    root.selected = null;
                    this.className = "hex";
                }
            };
            this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
            this.toHexDOM_sub(node, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
            if (this.sub === null) node.appendChild(DOM.text(this.stream.hexDump(this.posContent(), this.posEnd())));else if (this.sub.length > 0) {
                var first = this.sub[0];
                var last = this.sub[this.sub.length - 1];
                this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
                for (var i = 0, max = this.sub.length; i < max; ++i) {
                    node.appendChild(this.sub[i].toHexDOM(root));
                }this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
            }
            return node;
        }
    }, {
        key: "toHexString",
        value: function toHexString(root) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        }
    }]);

    return ASN1;
}();

ASN1.decodeLength = function (stream) {
    var buf = stream.get(),
        len = buf & 0x7F;
    if (len == buf) return len;
    if (len > 3) throw "Length over 24 bits not supported at position " + (stream.pos - 1);
    if (len === 0) return -1; // undefined
    buf = 0;
    for (var i = 0; i < len; ++i) {
        buf = buf << 8 | stream.get();
    }return buf;
};
ASN1.hasContent = function (tag, len, stream) {
    if (tag & 0x20) // constructed
        return true;
    if (tag < 0x03 || tag > 0x04) return false;
    var p = new Stream(stream);
    if (tag == 0x03) p.get(); // BitString unused bits, must be in [0, 7]
    var subTag = p.get();
    if (subTag >> 6 & 0x01) // not (universal or context)
        return false;
    try {
        var subLength = ASN1.decodeLength(p);
        return p.pos - stream.pos + subLength == len;
    } catch (exception) {
        return false;
    }
};
ASN1.decode = function (stream) {
    if (!(stream instanceof Stream)) stream = new Stream(stream, 0);
    var streamStart = new Stream(stream),
        tag = stream.get(),
        len = ASN1.decodeLength(stream),
        header = stream.pos - streamStart.pos,
        sub = null;
    if (ASN1.hasContent(tag, len, stream)) {
        // it has content, so we decode it
        var start = stream.pos;
        if (tag == 0x03) stream.get(); // skip BitString unused bits, must be in [0, 7]
        sub = [];
        if (len >= 0) {
            // definite length
            var end = start + len;
            while (stream.pos < end) {
                sub[sub.length] = ASN1.decode(stream);
            }if (stream.pos != end) throw "Content size is not correct for container starting at offset " + start;
        } else {
            // undefined length
            try {
                for (;;) {
                    var s = ASN1.decode(stream);
                    if (s.tag === 0) break;
                    sub[sub.length] = s;
                }
                len = start - stream.pos;
            } catch (e) {
                throw "Exception while decoding undefined length content: " + e;
            }
        }
    } else stream.pos += len; // skip content
    return new ASN1(streamStart, header, len, tag, sub);
};
ASN1.test = function () {
    var test = [{ value: [0x27], expected: 0x27 }, { value: [0x81, 0xC9], expected: 0xC9 }, { value: [0x83, 0xFE, 0xDC, 0xBA], expected: 0xFEDCBA }];
    for (var i = 0, max = test.length; i < max; ++i) {
        var pos = 0,
            stream = new Stream(test[i].value, 0),
            res = ASN1.decodeLength(stream);
        if (res != test[i].expected) document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
    }
};

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/asn1js/base64.js":
/*!************************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/asn1js/base64.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */

var Base64 = exports.Base64 = {};
var decoder = void 0;

Base64.decode = function (a) {
    var i;
    if (decoder === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            ignore = "= \f\n\r\t\xA0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 64; ++i) {
            decoder[b64.charAt(i)] = i;
        }for (i = 0; i < ignore.length; ++i) {
            decoder[ignore.charAt(i)] = -1;
        }
    }
    var out = [];
    var bits = 0,
        char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=') break;
        c = decoder[c];
        if (c == -1) continue;
        if (c === undefined) throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 4) {
            out[out.length] = bits >> 16;
            out[out.length] = bits >> 8 & 0xFF;
            out[out.length] = bits & 0xFF;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 6;
        }
    }
    switch (char_count) {
        case 1:
            throw "Base64 encoding incomplete: at least 2 bits missing";
        case 2:
            out[out.length] = bits >> 10;
            break;
        case 3:
            out[out.length] = bits >> 16;
            out[out.length] = bits >> 8 & 0xFF;
            break;
    }
    return out;
};

Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
Base64.unarmor = function (a) {
    var m = Base64.re.exec(a);
    if (m) {
        if (m[1]) a = m[1];else if (m[2]) a = m[2];else throw "RegExp out of sync";
    }
    return Base64.decode(a);
};

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/asn1js/hex.js":
/*!*********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/asn1js/hex.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
// 
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
var Hex = exports.Hex = {};
var decoder = void 0;

Hex.decode = function (a) {
    var i;
    if (decoder === undefined) {
        var hex = "0123456789ABCDEF",
            ignore = " \f\n\r\t\xA0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 16; ++i) {
            decoder[hex.charAt(i)] = i;
        }hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i) {
            decoder[hex.charAt(i)] = i;
        }for (i = 0; i < ignore.length; ++i) {
            decoder[ignore.charAt(i)] = -1;
        }
    }
    var out = [],
        bits = 0,
        char_count = 0;
    for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=') break;
        c = decoder[c];
        if (c == -1) continue;
        if (c === undefined) throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 2) {
            out[out.length] = bits;
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 4;
        }
    }
    if (char_count) throw "Hex encoding incomplete: 4 bits missing";
    return out;
};

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/base64.js":
/*!**********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/base64.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hex2b64 = hex2b64;

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }return ret;
}

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn.js":
/*!********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nbi = nbi;
exports.int2char = int2char;
exports.intAt = intAt;
exports.nbv = nbv;
exports.nbits = nbits;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;
var navigator;
var window;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = (canary & 0xffffff) == 0xefcafe;

// (public) Constructor

var BigInteger = exports.BigInteger = function BigInteger(a, b, c) {
  _classCallCheck(this, BigInteger);

  if (a != null) if ("number" == typeof a) this.fromNumber(a, b, c);else if (b == null && "string" != typeof a) this.fromString(a, 256);else this.fromString(a, b);
};

// return new, unset BigInteger


function nbi() {
  return new BigInteger(null);
}

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {
  while (--n >= 0) {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 0x4000000);
    w[j++] = v & 0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {
  var xl = x & 0x7fff,
      xh = x >> 15;
  while (--n >= 0) {
    var l = this[i] & 0x7fff;
    var h = this[i++] >> 15;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l & 0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {
  var xl = x & 0x3fff,
      xh = x >> 14;
  while (--n >= 0) {
    var l = this[i] & 0x3fff;
    var h = this[i++] >> 14;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
    c = (l >> 28) + (m >> 14) + xh * h;
    w[j++] = l & 0xfffffff;
  }
  return c;
}
if (j_lm && navigator && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else if (j_lm && navigator && navigator.appName != "Netscape") {
  BigInteger.prototype.am = am1;
  dbits = 26;
} else {
  // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = [];
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}function int2char(n) {
  return BI_RM.charAt(n);
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) {
    r[i] = this[i];
  }r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0) this[0] = x;else if (x < -1) this[0] = x + this.DV;else this.t = 0;
}

// return bigint initialized to value
function nbv(i) {
  var r = nbi();r.fromInt(i);return r;
}

// (protected) set from string and radix
function bnpFromString(s, b) {
  var k;
  if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 256) k = 8; // byte array
  else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else {
      this.fromRadix(s, b);return;
    }
  this.t = 0;
  this.s = 0;
  var i = s.length,
      mi = false,
      sh = 0;
  while (--i >= 0) {
    var x = k == 8 ? s[i] & 0xff : intAt(s, i);
    if (x < 0) {
      if (s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if (sh == 0) this[this.t++] = x;else if (sh + k > this.DB) {
      this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
      this[this.t++] = x >> this.DB - sh;
    } else this[this.t - 1] |= x << sh;
    sh += k;
    if (sh >= this.DB) sh -= this.DB;
  }
  if (k == 8 && (s[0] & 0x80) != 0) {
    this.s = -1;
    if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
  }
  this.clamp();
  if (mi) BigInteger.ZERO.subTo(this, this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c) {
    --this.t;
  }
}

// (public) return string representation in given radix
function bnToString(b) {
  if (this.s < 0) return "-" + this.negate().toString(b);
  var k;
  if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);
  var km = (1 << k) - 1,
      d,
      m = false,
      r = "",
      i = this.t;
  var p = this.DB - i * this.DB % k;
  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) > 0) {
      m = true;r = int2char(d);
    }
    while (i >= 0) {
      if (p < k) {
        d = (this[i] & (1 << p) - 1) << k - p;
        d |= this[--i] >> (p += this.DB - k);
      } else {
        d = this[i] >> (p -= k) & km;
        if (p <= 0) {
          p += this.DB;--i;
        }
      }
      if (d > 0) m = true;
      if (m) r += int2char(d);
    }
  }
  return m ? r : "0";
}

// (public) -this
function bnNegate() {
  var r = nbi();BigInteger.ZERO.subTo(this, r);return r;
}

// (public) |this|
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s - a.s;
  if (r != 0) return r;
  var i = this.t;
  r = i - a.t;
  if (r != 0) return this.s < 0 ? -r : r;
  while (--i >= 0) {
    if ((r = this[i] - a[i]) != 0) return r;
  }return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1,
      t;
  if ((t = x >>> 16) != 0) {
    x = t;r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;r += 1;
  }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if (this.t <= 0) return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n, r) {
  var i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + n] = this[i];
  }for (i = n - 1; i >= 0; --i) {
    r[i] = 0;
  }r.t = this.t + n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n, r) {
  for (var i = n; i < this.t; ++i) {
    r[i - n] = this[i];
  }r.t = Math.max(this.t - n, 0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n, r) {
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n / this.DB),
      c = this.s << bs & this.DM,
      i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + ds + 1] = this[i] >> cbs | c;
    c = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) {
    r[i] = 0;
  }r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n, r) {
  r.s = this.s;
  var ds = Math.floor(n / this.DB);
  if (ds >= this.t) {
    r.t = 0;return;
  }
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i) {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }
  if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
  r.t = this.t - ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a, r) {
  var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c -= a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r) {
  var x = this.abs(),
      y = a.abs();
  var i = x.t;
  r.t = i + y.t;
  while (--i >= 0) {
    r[i] = 0;
  }for (i = 0; i < y.t; ++i) {
    r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
  }r.s = 0;
  r.clamp();
  if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2 * x.t;
  while (--i >= 0) {
    r[i] = 0;
  }for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }
  if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r) {
  var pm = m.abs();
  if (pm.t <= 0) return;
  var pt = this.abs();
  if (pt.t < pm.t) {
    if (q != null) q.fromInt(0);
    if (r != null) this.copyTo(r);
    return;
  }
  if (r == null) r = nbi();
  var y = nbi(),
      ts = this.s,
      ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
  if (nsh > 0) {
    pm.lShiftTo(nsh, y);pt.lShiftTo(nsh, r);
  } else {
    pm.copyTo(y);pt.copyTo(r);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0) return;
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt,
      d2 = (1 << this.F1) / yt,
      e = 1 << this.F2;
  var i = r.t,
      j = i - ys,
      t = q == null ? nbi() : q;
  y.dlShiftTo(j, t);
  if (r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t, r);
  }
  BigInteger.ONE.dlShiftTo(ys, t);
  t.subTo(y, y); // "negative" y so we can replace sub with am later
  while (y.t < ys) {
    y[y.t++] = 0;
  }while (--j >= 0) {
    // Estimate quotient digit
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
      // Try it out
      y.dlShiftTo(j, t);
      r.subTo(t, r);
      while (r[i] < --qd) {
        r.subTo(t, r);
      }
    }
  }
  if (q != null) {
    r.drShiftTo(ys, q);
    if (ts != ms) BigInteger.ZERO.subTo(q, q);
  }
  r.t = ys;
  r.clamp();
  if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
  if (ts < 0) BigInteger.ZERO.subTo(r, r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
  return r;
}

// Modular reduction using "classic" algorithm

var Classic = exports.Classic = function Classic(m) {
  _classCallCheck(this, Classic);

  this.m = m;
};

function cConvert(x) {
  if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;
}
function cRevert(x) {
  return x;
}
function cReduce(x) {
  x.divRemTo(this.m, null, x);
}
function cMulTo(x, y, r) {
  x.multiplyTo(y, r);this.reduce(r);
}
function cSqrTo(x, r) {
  x.squareTo(r);this.reduce(r);
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if (this.t < 1) return 0;
  var x = this[0];
  if ((x & 1) == 0) return 0;
  var y = x & 3; // y == 1/x mod 2^2
  y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
  y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
  y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return y > 0 ? this.DV - y : -y;
}

// Montgomery reduction

var Montgomery = exports.Montgomery = function Montgomery(m) {
  _classCallCheck(this, Montgomery);

  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 0x7fff;
  this.mph = this.mp >> 15;
  this.um = (1 << m.DB - 15) - 1;
  this.mt2 = 2 * m.t;
};

// xR mod m


function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while (x.t <= this.mt2) {
    // pad x so am has enough room later
    x[x.t++] = 0;
  }for (var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i] & 0x7fff;
    var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
    // propagate carry
    while (x[j] >= x.DV) {
      x[j] -= x.DV;x[++j]++;
    }
  }
  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x, r) {
  x.squareTo(r);this.reduce(r);
}

// r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r) {
  x.multiplyTo(y, r);this.reduce(r);
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z) {
  if (e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(),
      r2 = nbi(),
      g = z.convert(this),
      i = nbits(e) - 1;
  g.copyTo(r);
  while (--i >= 0) {
    z.sqrTo(r, r2);
    if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {
      var t = r;r = r2;r2 = t;
    }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m) {
  var z;
  if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);
  return this.exp(e, z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn2.js":
/*!*********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn2.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigInteger = undefined;

var _jsbn = __webpack_require__(/*! ./jsbn */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn.js");

Object.defineProperty(exports, "BigInteger", {
  enumerable: true,
  get: function get() {
    return _jsbn.BigInteger;
  }
});


/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/prng4.js":
/*!*********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/prng4.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prng_newstate = prng_newstate;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// prng4.js - uses Arcfour as a PRNG

var Arcfour = exports.Arcfour = function Arcfour() {
  _classCallCheck(this, Arcfour);

  this.i = 0;
  this.j = 0;
  this.S = [];
};

// Initialize arcfour context from key, an array of ints, each from [0..255]


function ARC4init(key) {
  var i, j, t;
  for (i = 0; i < 256; ++i) {
    this.S[i] = i;
  }j = 0;
  for (i = 0; i < 256; ++i) {
    j = j + this.S[i] + key[i % key.length] & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = this.i + 1 & 255;
  this.j = this.j + this.S[this.i] & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[t + this.S[this.i] & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = exports.rng_psize = 256;

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rng.js":
/*!*******************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/rng.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecureRandom = undefined;

var _prng = __webpack_require__(/*! ./prng4 */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/prng4.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Random number generator - requires a PRNG backend, e.g. prng4.js
var rng_state;
var rng_pool;
var rng_pptr;
var window;

// Initialize the pool with junk if needed.
if (rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if (window && window.crypto && window.crypto.getRandomValues) {
    // Extract entropy (2048 bits) from RNG if available
    var z = new Uint32Array(256);
    window.crypto.getRandomValues(z);
    for (t = 0; t < z.length; ++t) {
      rng_pool[rng_pptr++] = z[t] & 255;
    }
  }

  // Use mouse events for entropy, if we do not have enough entropy by the time
  // we need it, entropy will be generated by Math.random.
  var onMouseMoveListener = function onMouseMoveListener(ev) {
    this.count = this.count || 0;
    if (this.count >= 256 || rng_pptr >= _prng.rng_psize) {
      if (window.removeEventListener) window.removeEventListener("mousemove", onMouseMoveListener, false);else if (window.detachEvent) window.detachEvent("onmousemove", onMouseMoveListener);
      return;
    }
    try {
      var mouseCoordinates = ev.x + ev.y;
      rng_pool[rng_pptr++] = mouseCoordinates & 255;
      this.count += 1;
    } catch (e) {
      // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
    }
  };
  if (window && window.addEventListener) window.addEventListener("mousemove", onMouseMoveListener, false);else if (window && window.attachEvent) window.attachEvent("onmousemove", onMouseMoveListener);
}

function rng_get_byte() {
  if (rng_state == null) {
    rng_state = (0, _prng.prng_newstate)();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < _prng.rng_psize) {
      var random = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
      rng_pool[rng_pptr] = 0;
    }rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for (i = 0; i < ba.length; ++i) {
    ba[i] = rng_get_byte();
  }
}

var SecureRandom = exports.SecureRandom = function SecureRandom() {
  _classCallCheck(this, SecureRandom);
};

SecureRandom.prototype.nextBytes = rng_get_bytes;

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa.js":
/*!*******************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSAKey = undefined;
exports.parseBigInt = parseBigInt;

var _jsbn = __webpack_require__(/*! ./jsbn2 */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/jsbn2.js");

var _rng = __webpack_require__(/*! ./rng */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rng.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object

function parseBigInt(str, r) {
  return new _jsbn.BigInteger(str, r);
}


// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s, n) {
  if (n < s.length + 11) {
    // TODO: fix for utf-8
    console.error("Message too long for RSA");
    return null;
  }
  var ba = [];
  var i = s.length - 1;
  while (i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if (c < 128) {
      // encode using utf-8
      ba[--n] = c;
    } else if (c > 127 && c < 2048) {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 | 192;
    } else {
      ba[--n] = c & 63 | 128;
      ba[--n] = c >> 6 & 63 | 128;
      ba[--n] = c >> 12 | 224;
    }
  }
  ba[--n] = 0;
  var rng = new _rng.SecureRandom();
  var x = [];
  while (n > 2) {
    // random non-zero pad
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new _jsbn.BigInteger(ba);
}

// "empty" RSA key constructor

var RSAKey = exports.RSAKey = function RSAKey() {
  _classCallCheck(this, RSAKey);

  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
};

// Set the public key fields N and e from hex strings


function RSASetPublic(N, E) {
  if (N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N, 16);
    this.e = parseInt(E, 16);
  } else console.error("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text, this.n.bitLength() + 7 >> 3);
  if (m == null) return null;
  var c = this.doPublic(m);
  if (c == null) return null;
  var h = c.toString(16);
  if ((h.length & 1) == 0) return h;else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

/***/ }),

/***/ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa2.js":
/*!********************************************************!*\
  !*** ./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa2.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSAKey = undefined;

var _rsa = __webpack_require__(/*! ./rsa */ "./PlatwareClient/js-encrypt/bin/lib/jsbn/rsa.js");

Object.defineProperty(exports, "RSAKey", {
  enumerable: true,
  get: function get() {
    return _rsa.RSAKey;
  }
});


/***/ }),

/***/ "./PlatwareClient/pwCore.js":
/*!**********************************!*\
  !*** ./PlatwareClient/pwCore.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DatePars = __webpack_require__(/*! ./pwDateParsing.js */ "./PlatwareClient/pwDateParsing.js");
var CryptoJS = __webpack_require__(/*! ./pwCrypto */ "./PlatwareClient/pwCrypto.js");
var JSEncrypt = __webpack_require__(/*! ./js-encrypt/bin/jsencrypt.1.js */ "./PlatwareClient/js-encrypt/bin/jsencrypt.1.js");
var Props = __webpack_require__(/*! ./pwDefaultProps.js */ "./PlatwareClient/pwDefaultProps.js");


/**
 * AESEncryption core methods.
 */
var AESEncryption = {};

AESEncryption.AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AESEncryption.AesUtil.prototype.generateKey = function (salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
    passPhrase,
    CryptoJS.enc.Hex.parse(salt), {
      keySize: this.keySize,
      iterations: this.iterationCount
    });
  return key;
}

AESEncryption.AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
    plainText,
    key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
  try {
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  } catch (error) {
    throw error;
  }
}

AESEncryption.AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    key, {
      iv: CryptoJS.enc.Hex.parse(iv)
    });
  try {
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw error;
  }
}


AESEncryption.cryptor = {
  encryptText: function (plainMsg, keyStr, callback) {
    var iv = "00000000000000000000000000000000";
    var salt = "00000000000000000000000000000000";
    var keySize = 256;
    var iterationCount = 100;
    var passPhrase = keyStr;
    var aesUtil = new AESEncryption.AesUtil(keySize, iterationCount);
    var encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainMsg);
    return encrypt;
  },
  decryptText: function (cipherMsg, keyStr, callback) {
    var iv = "00000000000000000000000000000000";
    var salt = "00000000000000000000000000000000";
    var keySize = 256;
    var iterationCount = 100;
    var passPhrase = keyStr;
    var aesUtil = new AESEncryption.AesUtil(keySize, iterationCount);
    var decrypt = aesUtil.decrypt(salt, iv, passPhrase, cipherMsg);
    return decrypt;
  },
  hex: function (strin) {
    // var string = 'kunwar';
    var string = '39563JSHUSJNS18';
    var hexStr = CryptoJS.enc.Hex.parse(string);
    return hexStr;
  }

}


/**
 * core methods.
 */

var prepareKey = function (key) {
  return Props.getGlobalHeaders().orgId + '-' + Props.getGlobalHeaders().appId + '-' + key;
}

/**
 * [Check wheather to call property master or not]
 * @return {[type]} []
 */
var checkPropCall = function () {
  var r = window.localStorage.getItem(prepareKey('pmlc'));
  var t = DatePars.finalDate('propMas', new Date());
  return r === t;
};

var setPmlcValue = function () {
  window.localStorage.setItem(prepareKey('pmlc'), DatePars.finalDate('propMas', new Date()));
};

var checkRegisCall = function () {
  window.localStorage.removeItem(prepareKey("regisFail"));
  var p = window.localStorage.getItem(prepareKey('Publickey'));
  var j = window.localStorage.getItem(prepareKey('jwtToken'));
  return p != null && j != null;
};

var userCredentials = function (id, value, key) {
  window.localStorage.setItem(prepareKey("loginId"), id);
  window.localStorage.setItem(prepareKey("authJwtToken"), getEncryption(value, key));
};

var clearCreds = function () {
  window.localStorage.removeItem(prepareKey("authJwtToken"));
  window.localStorage.removeItem(prepareKey("loginId"));
};


var clearCredsAll = function () {
  window.localStorage.removeItem(prepareKey("authJwtToken"));
  window.localStorage.removeItem(prepareKey("loginId"));
  window.localStorage.removeItem(prepareKey("regisFail"));
  window.localStorage.removeItem(prepareKey("Publickey"));
  window.localStorage.removeItem(prepareKey("jwtToken"));
  window.localStorage.removeItem(prepareKey("pmlc"));
};

var randomString = function (length) {
  /**
   *  Random number generator
   *
   * @return {string} Random string.
   *
   */
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};


var base64ToHex = function (str) {
  /**
   * Converts a Base64 string to a hex.
   *
   * @return {object} The hex object.
   *
   */
  try {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
      var tmp = bin.charCodeAt(i).toString(16);
      if (tmp.length === 1) tmp = "0" + tmp;
      hex[hex.length] = tmp;
    }
    //The hex string.
    return hex.join("");
  } catch (error) {
    return;
  }

};


var authCredentials = function (data, key, token) {
  var obj = {};
  for (var keyValue in data) {
    if (keyValue === 'public-pem') {
      obj["key"] = AESEncryption.cryptor.encryptText(data[keyValue].toString(), key);
    }
  }
  window.localStorage.setItem(prepareKey("Publickey"), obj['key']);
  window.localStorage.setItem(prepareKey("jwtToken"), token);
};

var getHexString = function (value) {
  /**
   * Creates a byte array filled with random bytes.
   *
   * @param {number} value The number of random bytes to generate.
   *
   * @return {ByteArray} The random word array.
   *
   */
  var byteArray = [];
  for (var i = 0; i < value.length; i++) {
    byteArray.push(value.charCodeAt(i));
  }
  /**
   * @return {string} The hex string.
   */
  var value = toHexString(byteArray);
  return value;
};

var toHexString = function (byteArray) {
  /**
   * Converts a byte array to a hex string.
   *
   * @param {ByteArray} byteArray The byte array.
   *
   * @return {string} The hex string.
   *
   */
  return Array.from(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
};

var getEncryption = function (plaintext, key) {
  /**
   * Encrypts a text using a key.
   *
   * @param {WordArray|string} plaintext The plaintext to encrypt.
   * @param {string} key The key.
   *
   * @return The encrypt string.
   *
   */
  var a = AESEncryption.cryptor.encryptText(plaintext, key);
  // Encrypt
  return a;
};

var getDecryption = function (text, key) {
  /**
   * Decrypts a text using a key.
   *
   * @param {WordArray|string} text The text to decrypt.
   * @param {string} key The key.
   *
   * @return The decrypt string.
   *
   */
  var b = AESEncryption.cryptor.decryptText(text, key);
  // Decrypt
  return b != undefined ? b : "";
};

var getHashvalue = function (plaintext, key) {
  /**
   * The HMAC's object interface.
   *
   * @param {WordArray|string} plaintext The plaintext to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The hash.
   *
   */
  var hash = CryptoJS.HmacSHA512(plaintext, key).toString();
  // hash
  return hash;
};

var RSAEncrypt = function (plaintext, key) {

  /**
   * Encrypts a text using public key.
   *
   * @param {WordArray|string} text The text to encrypt.
   * @param {string} key The private key.
   *
   * @return The encrypt string.
   *
   */
  var encrypt = new JSEncrypt.JSEncrypt();
  encrypt.setPublicKey(key);
  var encrypted = encrypt.encrypt(plaintext);
  // Encrypt
  return encrypted;
};

var RSADecrypt = function (text, randomKey) {
  /**
   * Decrypts a text using private key.
   *
   * @param {WordArray|string} text The text to decrypt.
   * @param {string} key The private key.
   *
   * @return The decrypt string.
   *
   */
  var decrypt = new JSEncrypt.JSEncrypt();
  decrypt.setPrivateKey(randomKey);
  var uncrypted = decrypt.decrypt(text);
  // Decrypt
  return uncrypted;
};


var getClientid = function (env) {
  /**
   *
   * @return Client id .
   *
   */
  return env.orgId + "~" + env.appId;
};


var getRequestid = function (id, fingerprint, date, env) {
  /**
   *
   * @return Request id .
   *
   */
  return env.orgId + env.appId + fingerprint + id + DatePars.finalDate('requestid', date);
};

var generateTxnKey = function (date, env) {
  /**
   *
   * @return txn key and hex string .
   *
   */
  var txn = randomString(32 - DatePars.finalDate('txnDate', date).length);
  txn = DatePars.finalDate('txnDate', date) + txn;
  var encryKey = window.localStorage.getItem(prepareKey('Publickey'));
  var decKey = getDecryption(encryKey, env.secureKey);
  var b64txn = RSAEncrypt(txn, decKey);
  b64txn = base64ToHex(b64txn);

  return {
    t: txn,
    b: b64txn
  };
};


var validateEnv = function (req) {
  if (req.hasOwnProperty('envProps') && typeof (req.envProps) === 'object' &&
    !Array.isArray(req.envProps)) {
    return true;
  } else {
    return false;
  }
};
var validateHeader = function (req) {
  if (Object.keys(req) != 0) {
    for (var h in req) {
      if (typeof (req[h]) === 'string') {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

var validateReq = function (req, type) {
  if (req.reqData && req.reqData.hasOwnProperty(type)) {
    if (typeof (req.reqData[type]) === 'object' && !Array.isArray(req.reqData[type])) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};


var validateUrl = function (req) {
  var url = req.url.trim();
  if (req.hasOwnProperty('url') && url != '' && typeof (url) === 'string') {
    return true;
  } else {
    return false;
  }
};

var validateEnvKey = function (req) {
  if (req.envProps &&
    req.envProps.hasOwnProperty('environment') &&
    req.envProps.environment.hasOwnProperty('envProps') &&
    req.envProps.environment.envProps.hasOwnProperty('orgId') &&
    req.envProps.environment.envProps.hasOwnProperty('appId') &&
    req.envProps.environment.envProps.hasOwnProperty('secureKey') &&
    req.envProps.environment.envProps.hasOwnProperty('appVersion')) {
    if (typeof (req.envProps.environment.envProps.orgId) === 'string' &&
      typeof (req.envProps.environment.envProps.appId) === 'string' &&
      typeof (req.envProps.environment.envProps.appVersion) === 'string') {
      if (req.envProps.environment.envProps.orgId &&
        req.envProps.environment.envProps.appId &&
        req.envProps.environment.envProps.appVersion) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};


var reqValidate = function (req) {
  if (typeof (req) === 'object' && !Array.isArray(req)) {
    var url = validateUrl(req);
    var env = validateEnv(req);
    var serv = validateReq(req, 'services');
    var envKey = validateEnvKey(req);

    if (url && env && serv && envKey) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
var validateBody = function (req) {
  for (var s in req) {
    if (Array.isArray(req[s])) {
      for (var a in req[s]) {
        if (typeof (req[s][a]) === 'object') {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
};

var setGuid = function (key) {
  var d = new Date().getTime();
  var guid = 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  localStorage.setItem("GUID", getEncryption(guid, key));
}



module.exports = {
  checkPropCall: checkPropCall,
  setpm: setPmlcValue,
  randomKey: randomString,
  b64toHex: base64ToHex,
  HexStr: getHexString,
  AESEnc: getEncryption,
  AESDec: getDecryption,
  Hmac: getHashvalue,
  RSAEnc: RSAEncrypt,
  RSADec: RSADecrypt,
  checkRegisCall: checkRegisCall,
  userCreds: userCredentials,
  authCreds: authCredentials,
  clearCreds: clearCreds,
  clientid: getClientid,
  requestid: getRequestid,
  txnKey: generateTxnKey,
  reqValid: reqValidate,
  bodyValid: validateBody,
  headerValid: validateHeader,
  clearCredsAll: clearCredsAll,
  prepareKey: prepareKey,
  setGuid: setGuid
}


/***/ }),

/***/ "./PlatwareClient/pwCrypto.js":
/*!************************************!*\
  !*** ./PlatwareClient/pwCrypto.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
		});

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));

	//base64
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());

	//hmac
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());

	
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());
	
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());

	//x64-core
	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());

	//SHA-512
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());
	

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());

	//AES
	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS;

}));

/***/ }),

/***/ "./PlatwareClient/pwDateParsing.js":
/*!*****************************************!*\
  !*** ./PlatwareClient/pwDateParsing.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * [description]
 * @param  {[type]} type  [description]
 * @param  {[type]} today [Always a data object]
 * @return {[type]}       [description]
 */
var dateFormat = function (type, today) {
  if (!typeof today === 'object') {
    today = new Date();
  }

  // Generate initial state values
  var day = "",
    month = "",
    year = "",
    hour = "",
    minutes = "",
    seconds = "",
    miliseconds = "";

  // Working varialbes
  if (type === 'txnDate') {
    day = today.getUTCDate() + "";
    month = (today.getUTCMonth() + 1) + "";
    year = today.getUTCFullYear() + "";
    hour = today.getUTCHours() + "";
    minutes = today.getUTCMinutes() + "";
    seconds = today.getUTCSeconds() + "";
    miliseconds = today.getUTCMilliseconds() + "";
  } else {
    day = today.getDate() + "";
    month = (today.getMonth() + 1) + "";
    year = today.getFullYear() + "";
    hour = today.getHours() + "";
    minutes = today.getMinutes() + "";
    seconds = today.getSeconds() + "";
    miliseconds = today.getMilliseconds() + "";
  }

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  // Concat
  if (type === 'device') {
    return day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
  } else if (type === 'requestid') {
    return day + month + year + hour + minutes + seconds + miliseconds;
  } else if (type === 'txnDate') {
    return year.toString().substr(-2) + month + day + hour + minutes + seconds + addZero(miliseconds.toString());
  } else if (type === 'propMas') {
    return day + '-' + month + '-' + year;
  } else {
    return day + month + year + hour + minutes + seconds + miliseconds;
  }

  // Modify the miliseconds
  function addZero(time) {
    if (time.length == 2) {
      time = '0' + time;
    } else if (time.length == 1) {
      time = '00' + time;
    }
    return time;
  }
  // Modify the time
  function checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }
};

module.exports = {
  finalDate: dateFormat
}


/***/ }),

/***/ "./PlatwareClient/pwDefaultProps.js":
/*!******************************************!*\
  !*** ./PlatwareClient/pwDefaultProps.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var PWRequest = {
  "PWHeader": {
    "clientid": "",
    "deviceid": "",
    "platform": "WEB",
    "authorization": "",
    "requesttype": "",
    "txnkey": "",
    "requestid": "",
    "servicename": "",
    "hash": "",
  },
  "PWBody": {
    "interfaces": {
      "APPLICATION_VERSION": "",
      "DEVICE_TIMESTAMP": "",
      "PW_CLIENT_VERSION": "",
      "fingerprint": "",
      "DEVICE_MAKE": "",
      "DEVICE_MODEL": "",
      "PW_VERSION": "",
      "DEVICE_LATITUDE": "",
      "DEVICE_LONGITUDE": "",
    },
    "services": {}
  }
}

var globalHeaders = {
  orgId: "",
  appId: ""
};
var PWSecureKey = "";
var apiType = '';

var getUrl = function (type) {
  var url = '';
  switch (type) {
    case 'auth':
      url = '/register';
      break;
    case 'logout':
      url = '/logout';
      break;

    default:
      url = '/gateway';
      break;
  }
  return url;
}

var getErrors = function (type) {
  let error = {
    code: "",
    response: {
      message: "",
      status: ""
    },
  };
  switch (type) {
    case 'network':
      error = {
        code: "PW-0001",
        response: {
          "status": "Internet Connection appears to be offline, Please check your Internet connection."
        }
      };
      break;
    case 'bodyParam':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters(Body) are not valid",
          "status": ""
        },
      };
      break;
    case 'headerParam':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters(Headers) are not valid",
          "status": ""
        },
      };
      break;
    case 'guid':
      error = {
        code: "PW-0002",
        response: {
          "message": "Your session has been killed",
          "status": ""
        },
      };
      break;
    case 'requestInvalid':
      error = {
        code: "PW-0001",
        response: {
          "message": "Request parameters are not valid",
          "status": "Request Failure"
        },
      };
      break;

    case 'serviceInvalid':
      error = {
        code: "PW-0001",
        response: {
          "message": "We can process maximum of five services at once!",
          "status": ""
        },
      };
      break;

    case 'decryption':
      error = {
        code: "PW-0005",
        response: {
          "message": "Unable to decript data! Hint. Some data has been modified.",
          "status": ""
        },
      };
      break;

    case 'parsingResponse':
      error = {
        code: "PW-0005",
        response: {
          "message": "Unable to parse response data",
          "status": ""
        },
      };
      break;

    case 'serverConnecting':
      error = {
        code: "PW-0003",
        response: {
          "message": "Connection Error! We are unable to reach to the server",
          "status": ""
        },
      };
      break;

    case 'registrationFailed':
      error = {
        code: "PW-0004",
        response: {
          "message": "Handshake fail! Please connect to the server team.",
          "status": ""
        },
      };
      break;

    case 'loggedIn':
      error = {
        code: "PW-0005",
        response: {
          "message": "It seems like you are already logged in some other device. Kill you existing session and login again.",
          "status": ""
        },
      };
      break;


    default:
      error = {
        code: "PW-0003",
        response: {
          "message": "Some technical error occured! Please check you log and come back to us.",
          "status": ""
        },
      };
      break;
  }
  return error;
}

var setPWRequest = function () {
  this.PWRequest = {
    "PWHeader": {
      "clientid": "",
      "deviceid": "",
      "platform": "WEB",
      "authorization": "",
      "requesttype": "",
      "txnkey": "",
      "requestid": "",
      "servicename": "",
      "hash": "",
    },
    "PWBody": {
      "interfaces": {
        "APPLICATION_VERSION": "",
        "DEVICE_TIMESTAMP": "",
        "PW_CLIENT_VERSION": "",
        "fingerprint": "",
        "DEVICE_MAKE": "",
        "DEVICE_MODEL": "",
        "PW_VERSION": "",
        "DEVICE_LATITUDE": "",
        "DEVICE_LONGITUDE": "",
      },
      "services": {}
    }
  };
}

var setGlobalHeaders = function (o) {
  globalHeaders.orgId = o.orgId;
  globalHeaders.appId = o.appId;
}

var getGlobalHeaders = function (o) {
  return globalHeaders;
}

var setSecureKey = function (o) {
  PWSecureKey = o.secureKey;
}

var getSecureKey = function () {
  return PWSecureKey;
}

var setApiType = function (v) {
  apiType = v;
}

var getApiType = function () {
  return apiType;
}

module.exports = {
  PWRequest: PWRequest,
  SetPWRequest: setPWRequest,
  setGlobalHeaders: setGlobalHeaders,
  getGlobalHeaders: getGlobalHeaders,
  setSecureKey: setSecureKey,
  getSecureKey: getSecureKey,
  setApiType: setApiType,
  getApiType: getApiType,
  getUrl: getUrl,
  getErrors: getErrors
}


/***/ }),

/***/ "./PlatwareClient/pwPostRequest.js":
/*!*****************************************!*\
  !*** ./PlatwareClient/pwPostRequest.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core = __webpack_require__(/*! ./pwCore.js */ "./PlatwareClient/pwCore.js");
var Props = __webpack_require__(/*! ./pwDefaultProps.js */ "./PlatwareClient/pwDefaultProps.js");
var makePostCall = function (url, headers, body, aync, timeout, onSuccess, onFailure) {

  if (!typeof url === 'string' || !typeof aync === 'boolean') {
    onFailure('fail', 11, 'Please send url as string and async in type booleas');
  }

  if (!typeof headers === 'object' || !typeof body === 'object') {
    onFailure('fail', 11, 'Please send headers and body as type object');
  }

  var http = xhrRef();
  setTimeout(http, timeout);

  http.open('POST', url, aync);

  setHeaders(http, headers);
  http.send(JSON.stringify(body));
  /**
   * [description]
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  http.onerror = function (error) {
    onFailure(http.readyState, Props.getErrors('serverConnecting').code, JSON.stringify(Props.getErrors('serverConnecting').response));
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  http.ontimeout = function () {
    onFailure(http.readyState, Props.getErrors('serverConnecting').code, JSON.stringify(Props.getErrors('serverConnecting').response));
    console.log("ontimeout", http.status);
  }

  http.onreadystatechange = function (e) {
    if (http.readyState === 4) {
      try {
        var res = JSON.parse(e.target.response);
        var authService = Props.getApiType();
        if (headers.servicename === 'LOGOUT' && res.status === '625') {
          Core.clearCreds();
          onFailure('LOGOUT', res.status, e.target.response);
        } else if (res.status === '401' || res.status === '627' || res.status === '537') {
          onFailure('REGISTERAPP', res.status, e.target.response)
        } else if (headers.servicename === authService && res.status === '621') {
          onFailure(authService, res.status, e.target.response)
        } else if (res.status === '402' ||
          res.status === '622' || res.status === '628' || res.status === '528') {
          Core.clearCreds();
          onFailure(authService, res.status, e.target.response);
        } else if (http.status === 200) {
          var auth = http.getResponseHeader('Authorization');
          onSuccess({
            auth: auth
          }, http.readyState, http.status, e);
        } else {
          onFailure(http.readyState, 'PW-0003', e.target.response)
        }
      } catch (e) {
        if (status != 0) {
          onFailure(http.readyState, Props.getErrors('parsingResponse').code, JSON.stringify(Props.getErrors('parsingResponse').response));
        }
      }
    }
  }
}
/**
 * [timeout description]
 * @type {[type]}
 */
function xhrRef() {
  return new XMLHttpRequest();
}
/**
 * [setTimeout description]
 * @param {[type]} h [description]
 * @param {[type]} t [description]
 */
function setTimeout(h, t) {
  h.timeout = t;
}

/**
 * [setHeaders description]
 * @param {[type]} http    [description]
 * @param {[type]} headers [description]
 */
function setHeaders(http, headers) {
  http.setRequestHeader('Content-Type', 'application/json');
  if (Object.keys(headers).length > 0) {
    for (var k in headers) {
      if (headers.hasOwnProperty(k)) {
        http.setRequestHeader(k, headers[k]);
      }
    }
  }
}

module.exports = {
  post: makePostCall
};


/***/ }),

/***/ "./PlatwareClient/pwRequest.js":
/*!*************************************!*\
  !*** ./PlatwareClient/pwRequest.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Props = __webpack_require__(/*! ./pwDefaultProps.js */ "./PlatwareClient/pwDefaultProps.js");
var datePars = __webpack_require__(/*! ./pwDateParsing.js */ "./PlatwareClient/pwDateParsing.js");
var Core = __webpack_require__(/*! ./pwCore.js */ "./PlatwareClient/pwCore.js");

var platwareRequest = function (data, fingerprints) {
  /**
   * [Initializes a newly default props]
   */
  clearAllFields();
  /**
   * [Working varialbes]
   */
  var fp = fingerprints;
  var winNav = window.navigator;
  var serviceName = Object.keys(data.reqData.services).join("~").toString();
  var currentDate = new Date();
  var currentNounce = currentDate.getTime();
  var getNounce = Core.HexStr(currentDate.getTime().toString());
  var envProp = data.envProps.environment.envProps;
  /**
   * [Generate interfaces values ]
   */
  var interfacesKeys = data.reqData.interfaces;
  for (var x in interfacesKeys) {
    Props.PWRequest.PWBody.interfaces[x] = interfacesKeys[x];
  }

  /**
   * [Generate header values]
   */
  var headerKeys = data.header;
  for (var x in headerKeys) {
    Props.PWRequest.PWHeader[x] = headerKeys[x];
  }

  /**
   * [request parsing description]
   */
  if (serviceName === 'REGISTERAPP') {
    setRegisterHeaders(currentDate, currentNounce, fp, serviceName, getNounce, envProp);
    setRegisterBody(winNav, currentDate, fp, data, envProp);
  } else if (serviceName === Props.getApiType()) {
    setAuthHeaders(getNounce, data, serviceName, fp, currentNounce, currentDate, envProp);
    setAuthBody(fp, winNav, data, currentDate, envProp);
  } else if (data.url === '/gateway' || data.url === '/logout') {
    setServiceHeaders(currentDate, fp, serviceName, envProp);
    setServiceBody(currentDate, winNav, data, fp, envProp);
  }
};

/**
 * [clearAllFields description]
 * @return {[type]} [description]
 */
function clearAllFields() {
  Props.SetPWRequest();
}

/**
 * [setAuthHeaders description]
 * @param {[type]} getNounce     [description]
 * @param {[type]} data          [description]
 * @param {[type]} serviceName   [description]
 * @param {[type]} fp            [description]
 * @param {[type]} currentNounce [description]
 * @param {[type]} currentDate   [description]
 * @param {[type]} envProp       [description]
 */
function setAuthHeaders(getNounce, data, serviceName, fp, currentNounce, currentDate, envProp) {
  /**
   * [Working varialbes]
   */
  var authApi = Props.getApiType();
  var loginId = data.reqData.services[authApi][0].id ? data.reqData.services[authApi][0].id : "--";
  var secureKey = currentNounce.toString() + envProp.secureKey;
  var subString = secureKey.substring(0, 32);

  var authCrypto = envProp.orgId + "~" + envProp.appId + "~" +
    loginId + "~" + fp + ":user:" + currentNounce;

  var authEncryptKey = Core.AESEnc(authCrypto, subString);

  Props.PWRequest.PWHeader.requestid = Core.requestid(loginId, fp, currentDate, envProp);
  Props.PWRequest.PWHeader.authorization = "Basic " + authEncryptKey;
  Props.PWRequest.PWHeader["nounce"] = getNounce;

  setHeaderKeys(serviceName, fp, envProp, "ER_ER");

  var fLogin = window.localStorage.getItem(Core.prepareKey('forceLogin')) ? window.localStorage.getItem(Core.prepareKey('forceLogin')) : "";
  if (fLogin === 'Y') {
    Props.PWRequest.PWHeader["isforcelogin"] = fLogin;
  }
  // Save loginId
  Props.PWRequest['loginId'] = loginId;

}


function setAuthBody(fp, winNav, data, currentDate, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);

  Props.PWRequest.PWBody.services = data.reqData.services;
  /**
   * [Working varialbes]
   */

  // get txnKey
  var getKey = Core.txnKey(currentDate, envProp);
  Props.PWRequest.PWHeader.txnkey = getKey.b;

  var body = Core.AESEnc(JSON.stringify(Props.PWRequest.PWBody), getKey.t);
  var updateBody = {
    request: body
  };
  /**
   * [request body parsing description]
   */
  Props.PWRequest["temp"] = updateBody;
  Props.PWRequest.PWHeader.hash = (Core.Hmac(JSON.stringify(updateBody).toString(),
    getKey.t)).toUpperCase();

  // Save txnKey
  Props.PWRequest["txnkey"] = getKey.t.toString();

}

function setRegisterHeaders(currentDate, currentNounce, fp, serviceName, getNounce, envProp) {
  /**
   * [Working varialbes]
   */
  var secureKey = currentNounce.toString() + envProp.secureKey;
  var subString = secureKey.substring(0, 32);
  var authCrypto = envProp.orgId + "~" + envProp.appId + "~" +
    fp + ":app:" + currentNounce;
  var authEncryptKey = Core.AESEnc(authCrypto, subString);
  Props.PWRequest.PWHeader.txnkey = '',

    Props.PWRequest.PWHeader.authorization = "Basic " + authEncryptKey;
  var hashKey = Core.Hmac("Basic " + authEncryptKey, envProp.secureKey);

  /**
   * [request header parsing description]
   */
  Props.PWRequest.PWHeader.hash = hashKey;
  Props.PWRequest.PWHeader.requestid = Core.requestid('--', fp, currentDate, envProp);
  Props.PWRequest.PWHeader["nounce"] = getNounce;
  setHeaderKeys(serviceName, fp, envProp, "PR_PR");
}

function setRegisterBody(winNav, currentDate, fp, data, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);
  Props.PWRequest.PWBody.services = data.reqData.services;
}

function setServiceHeaders(currentDate, fp, serviceName, envProp) {
  /**
   * [Get JWT token]
   */
  var jwtToken = '';
  if (window.localStorage.getItem(Core.prepareKey('authJwtToken'))) {

    try {
      jwtToken = Core.AESDec(window.localStorage.getItem(Core.prepareKey('authJwtToken')), envProp.secureKey);
    } catch (error) {
      throw error
    }
  } else if (window.localStorage.getItem(Core.prepareKey('jwtToken'))) {
    try {
      jwtToken = Core.AESDec(window.localStorage.getItem(Core.prepareKey('jwtToken')), envProp.secureKey);
    } catch (error) {
      throw error
    }
  }

  Props.PWRequest.PWHeader.authorization = jwtToken;

  var loginID = window.localStorage.getItem(Core.prepareKey('loginId')) ? window.localStorage.getItem(Core.prepareKey('loginId')) : "--";
  Props.PWRequest.PWHeader.requestid = Core.requestid(loginID, fp, currentDate, envProp);

  setHeaderKeys(serviceName, fp, envProp, "ER_ER");
}

function setServiceBody(currentDate, winNav, data, fp, envProp) {
  /**
   * [request parsing interface description]
   */
  setInterface(currentDate, winNav, fp, envProp);

  /**
   * [request body parsing description]
   */
  Props.PWRequest.PWBody.services = data.reqData.services;

  /**
   * [Working varialbes]
   */

  // get txnKey
  var getKey = Core.txnKey(currentDate, envProp);
  Props.PWRequest.PWHeader.txnkey = getKey.b;

  var body = Core.AESEnc(JSON.stringify(Props.PWRequest.PWBody), getKey.t);
  var updateBody = {
    request: body
  };
  Props.PWRequest["temp"] = updateBody;
  Props.PWRequest.PWHeader.hash = (Core.Hmac(JSON.stringify(updateBody),
    getKey.t)).toUpperCase();

  // Save txnKey
  Props.PWRequest["txnkey"] = getKey.t.toString();
}

function setHeaderKeys(serviceName, fp, envProp, requesttype) {
  Props.PWRequest.PWHeader["clientid"] = Core.clientid(envProp);
  Props.PWRequest.PWHeader.servicename = serviceName;
  Props.PWRequest.PWHeader.deviceid = fp;
  Props.PWRequest.PWHeader["security-version"] = '2';
  Props.PWRequest.PWHeader.requesttype = requesttype;
}

function setInterface(currentDate, winNav, fp, envProp) {
  Props.PWRequest.PWBody.interfaces.DEVICE_TIMESTAMP = datePars.finalDate('device', currentDate);
  Props.PWRequest.PWBody.interfaces.fingerprint = fp;
  Props.PWRequest.PWBody.interfaces.APPLICATION_VERSION = envProp.appVersion;
  Props.PWRequest.PWBody.interfaces.PW_CLIENT_VERSION = "2.5.6";
  Props.PWRequest.PWBody.interfaces.DEVICE_MAKE = winNav.platform;
  Props.PWRequest.PWBody.interfaces.DEVICE_MODEL = winNav.vendor ? winNav.vendor : winNav.appCodeName;
  Props.PWRequest.PWBody.interfaces.DEVICE_LATITUDE = envProp.lat;
  Props.PWRequest.PWBody.interfaces.DEVICE_LONGITUDE = envProp.lon;
  Props.PWRequest.PWBody.interfaces.PW_VERSION = "";
}

module.exports = {
  finalReq: platwareRequest
}

/***/ }),

/***/ "./PlatwareClient/pwService.js":
/*!*************************************!*\
  !*** ./PlatwareClient/pwService.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core = __webpack_require__(/*! ./pwCore.js */ "./PlatwareClient/pwCore.js");
var Props = __webpack_require__(/*! ./pwDefaultProps.js */ "./PlatwareClient/pwDefaultProps.js");
var Request = __webpack_require__(/*! ./pwPostRequest.js */ "./PlatwareClient/pwPostRequest.js");
var pwRequest = __webpack_require__(/*! ./pwRequest.js */ "./PlatwareClient/pwRequest.js");


var fingerprint = function () {
  const id = localStorage.getItem("GUID");
  return Core.AESDec(id, Props.getSecureKey());
}

/**
 * [reqCallToPM description]
 * @param  {[type]} serviceData [description]
 * @param  {[type]} callfn      [description]
 * @return {[type]}             [description]
 */
function reqCallToPM(serviceData, callfn) {
  var obj1 = Object.assign({}, serviceData);
  var req = reqData(obj1);
  try {
    pwRequest.finalReq(req, fingerprint());
  } catch (error) {
    var fo = Props.getErrors('decryption').response;
    callfn(apiResponse(false, Props.getErrors('decryption').code, (fo)));
    return;
  }
  var body = Props.PWRequest.temp ? Props.PWRequest.temp : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;

  Request.post(req.envProps.environment.envProps.baseUrl + req.url, Props.PWRequest.PWHeader, body, true, 60000, function (headers, state, status, response) {
    try {
      var processReponse = response.target;
      var bodyData = processReponse.response ? JSON.parse(processReponse.response) : processReponse.response;
      if (bodyData && bodyData.response) {
        var decryRes = Core.AESDec(bodyData.response, txn.toString());
        bodyData = JSON.parse(decryRes);
      }

      for (var serviceName in bodyData ? bodyData.services : {}) {
        if (serviceName === 'PROPERTYMASTER') {
          var fl = bodyData.services.PROPERTYMASTER.records[0];
          if (fl.data) {
            for (var i = 0; i < fl.data.length; i++) {
              if (fl.data[i].propertyName === 'IS_FORCE_LOGIN') {
                Core.setpm();
                window.localStorage.setItem(Core.prepareKey("forceLogin"), fl.data[i].propertyValue);
                break;
              }
            }
          }
        }
      }

      if (typeof callfn === 'function') {
        reqCallToService(serviceData, callfn);
      }
    } catch (e) {
      throw "Some error occurred in property master"
    }

  }, function (state, status, response) {
    if (window.localStorage.getItem(Core.prepareKey('pmlc'))) {
      if (typeof callfn === 'function') {
        reqCallToService(serviceData, callfn);
      }
    } else if (!window.localStorage.getItem(Core.prepareKey('pmlc'))) {
      window.localStorage.setItem(Core.prepareKey("forceLogin"), 'N');
      reqCallToService(serviceData, callfn);
      return;

    } else {
      throw "Some error occurred in property master";
    }
  })
}

/**
 * [reqCallToService description]
 * @param  {[type]} data   [description]
 * @param  {[type]} callfn [description]
 * @return {[type]}        [description]
 */
function reqCallToService(data, callfn) {
  var apiData = data;
  try {
    pwRequest.finalReq(data, fingerprint());
  } catch (error) {
    var fo = Props.getErrors('decryption').response;
    callfn(apiResponse(false, Props.getErrors('decryption').code, (fo)));
    return;
  }
  var body = Props.PWRequest.temp ? Props.PWRequest.temp : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;
  Request.post(data.envProps.environment.envProps.baseUrl + data.url, Props.PWRequest.PWHeader, body, true, 60000, function (headers, state, status, response) {

    try {
      var processReponse = response.target;
      var bodyData = processReponse.response ? JSON.parse(processReponse.response) : processReponse.response;
      if (bodyData && bodyData.response) {
        var decryRes = Core.AESDec(bodyData.response, txn.toString());
        bodyData = JSON.parse(decryRes);
      }
      const authApi = Props.getApiType();
      for (var serviceName in bodyData ? bodyData.services : {}) {
        if (serviceName === authApi) {
          var authKey = headers.auth.toString();
          Core.userCreds(Props.PWRequest.loginId, authKey, data.envProps.environment.envProps.secureKey);
          callfn(apiResponse(true, status, bodyData.services[authApi].records[0].data[0].auth));
          return;
        }

      }

      console.log("bodyData", bodyData)

      var fO = {};
      for (var k in bodyData.services) {
        if (k === "REGISTERUSER") {
          fO['REGISTERUSER'] = bodyData.services[k].records;
          break;
        } else {
          fO[k] = bodyData.services[k].records;
        }
      }
      if (typeof callfn === 'function') {
        callfn(apiResponse(true, status, fO));
      }
    } catch (e) {
      var fo = Props.getErrors('parsingResponse').response;
      callfn(apiResponse(false, Props.getErrors('parsingResponse').code, (fo)));
    }

  }, function (state, status, response) {

    var rf = window.localStorage.getItem(Core.prepareKey("regisFail")) ?
      window.localStorage.getItem(Core.prepareKey("regisFail")) : false;
    if (state === 'LOGOUT' && status === '625') {
      try {
        Core.clearCreds();
        callfn(apiResponse(true, "PW-0002", JSON.parse(response)));
      } catch (e) {
        var fo = Props.getErrors('parsingResponse').response;
        callfn(apiResponse(false, Props.getErrors('parsingResponse').code, fo));
      }
    } else if (state === 'REGISTERAPP' && status === '401' ||
      status === '627' ||
      status === '537') {
      if (!rf) {
        Core.clearCredsAll();
        window.localStorage.setItem(Core.prepareKey("regisFail"), true);
        reqCallRegistration(apiData, callfn);
      } else {
        Core.clearCredsAll();
        // window.localStorage.clear();
        var fo = Props.getErrors('registrationFailed').response;
        callfn(apiResponse(false, Props.getErrors('registrationFailed').code, (fo)));
      }
    } else if (state === Props.getApiType() && status === '621') {
      var r = confirm("You are already logged in. Do you want to kill existing session?");
      if (r) {
        var headerKey = apiData.hasOwnProperty('header') ? true : false;
        if (headerKey) {
          apiData.header['isforcelogin'] = 'Y';
        } else {
          apiData['header'] = {};
          apiData.header['isforcelogin'] = 'Y';
        }
        reqCallToService(apiData, callfn);
      } else {
        var fo = Props.getErrors('loggedIn').response;
        callfn(apiResponse(false, Props.getErrors('loggedIn').code, fo));
      }
    } else if (status === '402' ||
      status === '622' || status === '628' || status === '528') {
      Core.clearCreds();
      try {
        callfn(apiResponse(false, "PW-0002", JSON.parse(response)));
      } catch (e) {
        var fo = Props.getErrors('parsingResponse').response;
        callfn(apiResponse(false, Props.getErrors('parsingResponse').code, fo));
      }
    } else if (status != 0) {
      try {
        callfn(apiResponse(false, status, JSON.parse(response)));
      } catch (e) {
        var fo = Props.getErrors('parsingResponse').response;
        callfn(apiResponse(false, Props.getErrors('parsingResponse').code, fo));
      }
    } else {
      try {
        callfn(apiResponse(false, status, JSON.parse(response)));
      } catch (error) {
        var fo = Props.getErrors('').response;
        callfn(apiResponse(false, Props.getErrors('').code, fo));
      }
    }
  })
}

/**
 * [reqData description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function reqData(data) {
  return {
    url: '/gateway',
    envProps: data.envProps,
    reqData: {
      "interfaces": {},
      "services": {
        "PROPERTYMASTER": [{}]
      }
    },
  }
}

/**
 * [reqReqData description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function reqReqData(data) {
  return {
    url: '/register',
    envProps: data.envProps,
    reqData: {
      "interfaces": {},
      "services": {
        "REGISTERAPP": [{}]
      }
    },
  }
}


function reqCallRegistration(data, callfn) {
  var apiReq = data;
  var req = reqReqData(data);
  pwRequest.finalReq(req, fingerprint());
  var body = Props.PWRequest.temp ? Props.PWRequest.temp : Props.PWRequest.PWBody;
  var txn = Props.PWRequest.txnkey;

  Request.post(req.envProps.environment.envProps.baseUrl + req.url, Props.PWRequest.PWHeader, body, true, 60000, function (headers, state, status, response) {
    try {
      var processReponse = response.target;
      var bodyData = processReponse.response ? JSON.parse(processReponse.response) : processReponse.response;
      if (bodyData && bodyData.response) {
        var decryRes = Core.AESDec(bodyData.response, txn.toString());
        bodyData = JSON.parse(decryRes);
      }
      for (var serviceName in bodyData ? bodyData.services : {}) {
        if (serviceName === 'REGISTERAPP') {
          var authKey = headers.auth.toString();
          var jwtToken = Core.AESEnc(authKey, data.envProps.environment.envProps.secureKey);
          var rsaData = bodyData.services.REGISTERAPP.records[0].data[0].rsa;
          var rsaJSON = JSON.parse(rsaData);
          Core.authCreds(rsaJSON, data.envProps.environment.envProps.secureKey, jwtToken);
          if (!Core.checkPropCall()) {
            // var req = reqData(apiReq);
            reqCallToPM(apiReq, callfn);
          } else {
            reqCallToService(apiReq, callfn);
          }
        }
      }
    } catch (e) {
      var fo = Props.getErrors('parsingResponse').response;
      callfn(apiResponse(false, Props.getErrors('parsingResponse').code, (fo)));
    }


  }, function (state, status, response) {
    var rf = window.localStorage.getItem(Core.prepareKey("regisFail")) ?
      window.localStorage.getItem(Core.prepareKey("regisFail")) : false;
    if (state === 'REGISTERAPP' && status === '401' ||
      status === '627' ||
      status === '537') {
      if (!rf) {
        Core.clearCredsAll();
        window.localStorage.setItem(Core.prepareKey("regisFail"), true);
        reqCallRegistration(apiData, callfn);
      } else {
        Core.clearCredsAll();
        var fo = Props.getErrors('registrationFailed').response;
        callfn(apiResponse(false, Props.getErrors('registrationFailed').code, (fo)));
        window.localStorage.removeItem(Core.prepareKey("regisFail")); // for registration
      }
    } else if (status != 0) {

      try {
        callfn(apiResponse(false, 'PW-0003', JSON.parse(response)));
      } catch (e) {

        var fo = Props.getErrors('parsingResponse').response;
        callfn(apiResponse(false, Props.getErrors('parsingResponse').code, fo));
      }
    } else {
      var fo = ps.getErrors('').response;
      callfn(apiResponse(false, ps.getErrors('parsingResponse').code, (fo)));
    }
  })
}

/**
 * [description]
 * @param  {[type]} v   [description]
 * @param  {[type]} sc  [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
var apiResponse = function (v, sc, res) {
  var response = {};
  if (v) {
    var response = {
      status: v,
      data: res
    }
  } else {
    var response = {
      status: v,
      serverCode: res.status,
      errorCode: sc,
      erroMessage: res.message,
    }
  }

  return response;
}


module.exports = {
  reqToPM: reqCallToPM,
  reqToService: reqCallToService,
  apiRes: apiResponse,
  callReg: reqCallRegistration
};


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./authentication/authentication.module": [
		"./src/app/authentication/authentication.module.ts",
		"authentication-authentication-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-us/contact-us.component */ "./src/app/contact-us/contact-us.component.ts");
/* harmony import */ var _guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./guard/auth.guard */ "./src/app/guard/auth.guard.ts");





var routes = [
    { path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule', canLoad: [_guard_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]] },
    { path: 'contactUs', component: _contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_3__["ContactUsComponent"] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { useHash: true })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<!-- <app-nav></app-nav> -->\n<app-loader></app-loader>\n<router-outlet></router-outlet>\n<!-- <app-footer></app-footer> -->\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var _shared_nav_nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/nav/nav.service */ "./src/app/shared/nav/nav.service.ts");
/* harmony import */ var _shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/services/AppConstant */ "./src/app/shared/services/AppConstant.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");






var AppComponent = /** @class */ (function () {
    function AppComponent(loaderService, navService) {
        this.loaderService = loaderService;
        this.navService = navService;
    }
    AppComponent.prototype.ngOnInit = function () {
        //  this.loaderService.showLoader();
        this.setThemeForAuth();
        console.log('version :', _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"]['version']);
    };
    /* Set's theme for auth */
    AppComponent.prototype.setThemeForAuth = function () {
        this.navService.setBackgroundColor('white');
        localStorage.removeItem(_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_4__["AppConstant"].SIGNUP_EMAIL);
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_loader_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"], _shared_nav_nav_service__WEBPACK_IMPORTED_MODULE_3__["NavService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contact-us/contact-us.component */ "./src/app/contact-us/contact-us.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _contact_us_contact_us_component__WEBPACK_IMPORTED_MODULE_7__["ContactUsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"].forRoot(),
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/contact-us/contact-us.component.html":
/*!******************************************************!*\
  !*** ./src/app/contact-us/contact-us.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row bgimg-1\">\n\n   <div class=\"col s12 m2\"></div>\n    <div class=\"col s12 m8\" style=\"margin-top: 53px;\">\n        <div class=\"card horizontal\">\n          <div style=\"width: 50%;background: #f6f6f6;padding-left: 30px;padding-top: 50px;padding-right: 30px;padding-bottom: 30px;\">\n      \n              <span class=\"heading\">CONTACT US!</span>\n              <div>\n                <span class=\"heading\">Let’s get in touch!</span>\n              </div>\n              <div>\n                <i style=\"color: #2457a7\"  class=\"material-icons\">call</i><span class=\"aligned-with-icon\">+91-088265 88009</span>\n              </div>\n              <div>\n                  <i style=\"color: #2457a7\"  class=\"material-icons\">call</i><span class=\"aligned-with-icon\">8th floor Block D, Pioneer Urban Square, Sector 62, Gurugram, Haryana 122102</span>\n              </div>\n      \n              \n      \n          </div>\n          <div style=\"width: 50%;padding-left: 30px;padding-top: 50px;padding-right: 30px;padding-bottom: 30px;\">\n            \n            \n                  <div class=\"center\">\n                    <img src=\"/assets/login/images/logo.png\">\n                  </div>\n                  \n                  <span class=\"heading\">Drop us a message!</span>\n                  <div></div>\n                  <span class=\"heading\">Soon, our expert will get in touch with you.</span>\n                  \n        \n                  \n                  <form [formGroup]=\"contactUsForm\" (ngSubmit)=\"submit()\">\n                        <div class=\"input-field1 center\">\n                            <label >Your Name</label>\n                            <input id=\"name\" placeholder=\"Enter name here\" type=\"email\" class=\"validate\" formControlName=\"name\">\n                        </div>\n      \n                        <div class=\"input-field1 center\">\n                            <label>Your Email ID</label>\n                            <input id=\"email\" placeholder=\"For example : abc@def.com\" type=\"email\" class=\"validate\" formControlName=\"email\">\n                        </div>\n      \n                        <div class=\"input-field1 center\">\n                            <label>Your Message</label>\n                            <textarea id=\"message\" placeholder=\"Enter message here..\" class=\"validate\" formControlName=\"message\"></textarea>\n                        </div>\n      \n        \n                        <div class=\"row \">\n                            <div class=\"input-field col s12 \">\n                              <button [disabled]=\"contactUsForm.invalid\" (click)=\"send()\" class=\"waves-effect btn sign-in-btn\">Send</button>\n                            </div>\n                        </div>\n      \n                        \n                  </form>\n                  \n      \n            \n          \n        </div>\n      </div>\n      <div class=\"col s12 m2\"></div>\n</div>\n\n\n         "

/***/ }),

/***/ "./src/app/contact-us/contact-us.component.scss":
/*!******************************************************!*\
  !*** ./src/app/contact-us/contact-us.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".bgimg-1 {\n  height: calc(100vh - 56px);\n  background-position: center 55%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-image: url(\"/assets/login/images/signup-bg.jpg\");\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 24px;\n  margin: .5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #f5f5f5; }\n\n.infoText {\n  font-size: 16px;\n  color: grey;\n  font-weight: 500; }\n\n.divInfo {\n  padding-left: 70px;\n  padding-right: 75px; }\n\n.input-field1 label {\n  font-size: 13px;\n  text-align: left;\n  width: 100%;\n  float: left;\n  margin-bottom: 2px;\n  color: #2c60ad;\n  margin-top: 5px; }\n\n.input-field1 input {\n  border: 1px solid #b9b9b9;\n  background: #fff;\n  box-shadow: none;\n  padding: 0 8px;\n  border-radius: 4px;\n  width: calc(100% - 20px);\n  line-height: 25px;\n  height: 38px;\n  font-size: 13px;\n  margin: 0px; }\n\n.sign-in-btn {\n  width: 100%;\n  background: #2457a7; }\n\n.heading {\n  font-family: 'Raleway-SemiBold';\n  color: #757575; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2RlY2ltYWwvRGVjaW1hbC92YWhhbmEvdmFoYW5hLXBvcnRhbC1hdXRoZW50aWNhdGlvbi9zcmMvYXBwL2NvbnRhY3QtdXMvY29udGFjdC11cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLDBCQUEwQjtFQUMxQiwrQkFBK0I7RUFDL0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtFQUN0QiwyREFBMkQ7RUFDM0Qsc0JBQW1CO0tBQW5CLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQix5QkFBeUIsRUFBQTs7QUFHN0I7RUFFSSxlQUFlO0VBQ2YsV0FBVztFQUNYLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGtCQUFrQjtFQUNsQixtQkFBbUIsRUFBQTs7QUFHdkI7RUFFUSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlLEVBQUE7O0FBUnZCO0VBWVEseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUluQjtFQUNJLFdBQVc7RUFDWCxtQkFBbUIsRUFBQTs7QUFHdkI7RUFDSSwrQkFBK0I7RUFDL0IsY0FDSixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29udGFjdC11cy9jb250YWN0LXVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi5iZ2ltZy0xIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA1NnB4KTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgNTUlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2xvZ2luL2ltYWdlcy9zaWdudXAtYmcuanBnXCIpO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG5cbi5jYXJkLXBhbmVsIHtcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4yNXM7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBtYXJnaW46IC41cmVtIDAgMXJlbSAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuXG4uaW5mb1RleHRcbntcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6IGdyZXk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLmRpdkluZm97XG4gICAgcGFkZGluZy1sZWZ0OiA3MHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDc1cHg7XG59XG5cbi5pbnB1dC1maWVsZDEge1xuICAgIGxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgICAgY29sb3I6ICMyYzYwYWQ7XG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICB9XG5cbiAgICBpbnB1dCB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNiOWI5Yjk7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XG4gICAgICAgIGhlaWdodDogMzhweDtcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICBtYXJnaW46IDBweDtcbiAgICB9XG59XG5cbi5zaWduLWluLWJ0biB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogIzI0NTdhNztcbn1cblxuLmhlYWRpbmd7XG4gICAgZm9udC1mYW1pbHk6ICdSYWxld2F5LVNlbWlCb2xkJztcbiAgICBjb2xvcjogIzc1NzU3NVxuO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/contact-us/contact-us.component.ts":
/*!****************************************************!*\
  !*** ./src/app/contact-us/contact-us.component.ts ***!
  \****************************************************/
/*! exports provided: ContactUsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactUsComponent", function() { return ContactUsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        this.initForm();
        this.submit();
    };
    ContactUsComponent.prototype.initForm = function () {
        this.contactUsForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            message: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        });
    };
    ContactUsComponent.prototype.submit = function () {
        console.log(this.contactUsForm.value);
    };
    ContactUsComponent.prototype.send = function () {
    };
    ContactUsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-contact-us',
            template: __webpack_require__(/*! ./contact-us.component.html */ "./src/app/contact-us/contact-us.component.html"),
            styles: [__webpack_require__(/*! ./contact-us.component.scss */ "./src/app/contact-us/contact-us.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ContactUsComponent);
    return ContactUsComponent;
}());



/***/ }),

/***/ "./src/app/guard/auth.guard.ts":
/*!*************************************!*\
  !*** ./src/app/guard/auth.guard.ts ***!
  \*************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");
/* harmony import */ var _shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/AppConstant */ "./src/app/shared/services/AppConstant.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(utilityService) {
        this.utilityService = utilityService;
    }
    AuthGuard.prototype.canLoad = function (route, segments) {
        return this.isUserLoggedIn();
    };
    AuthGuard.prototype.isUserLoggedIn = function () {
        var orgId = this.utilityService.getValueFromUserDetail(_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_3__["AppConstant"].ORG_ID);
        var email = this.utilityService.getValueFromUserDetail(_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_3__["AppConstant"].EMAIL);
        var userName = this.utilityService.getValueFromUserDetail(_shared_services_AppConstant__WEBPACK_IMPORTED_MODULE_3__["AppConstant"].USER_NAME);
        var result = !orgId || !email || !userName;
        if (!result) {
            window.open('/vahana/', '_top');
        }
        return result;
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_services_platwareService_utility_service__WEBPACK_IMPORTED_MODULE_2__["UtilityService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/shared/footer/footer.component.css":
/*!****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer-fixed{\n    position: relative;\n    bottom: 0;\n    width: 100%;\n    background: #000000;\n    z-index: 1;\n    height: 50px;\n    display: flex;\n    align-items: center;\n}\n\n.label{\n    \n    width: -webkit-fill-available;\n    font-family: 'HelveticaNeue';\n    \n}\n\n.label .all-right{\n    float: right;\n    margin-right: 30px;\n    font-size: 14px;\n}\n\n.label .all-right .a{\n    color: white;\n}\n\n.label .termCondition .a{\n    color: white;\n}\n\n.label .termCondition{\n    margin-left: 30px;\n    font-size: 14px;\n}\n\n.contactUs{\n    font-family: 'HelveticaNeue';\n    color: white;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksNkJBQTZCO0lBQzdCLDRCQUE0Qjs7QUFFaEM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFHQTtJQUNJLGlCQUFpQjtJQUNqQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLFlBQVk7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3Rlci1maXhlZHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICMwMDAwMDA7XG4gICAgei1pbmRleDogMTtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubGFiZWx7XG4gICAgXG4gICAgd2lkdGg6IC13ZWJraXQtZmlsbC1hdmFpbGFibGU7XG4gICAgZm9udC1mYW1pbHk6ICdIZWx2ZXRpY2FOZXVlJztcbiAgICBcbn1cblxuLmxhYmVsIC5hbGwtcmlnaHR7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbi1yaWdodDogMzBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5sYWJlbCAuYWxsLXJpZ2h0IC5he1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmxhYmVsIC50ZXJtQ29uZGl0aW9uIC5he1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuXG4ubGFiZWwgLnRlcm1Db25kaXRpb257XG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29udGFjdFVze1xuICAgIGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhTmV1ZSc7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"footer-fixed\" *ngIf='!hideFooter'>\n  \n    <div class=\"label\">\n      <label class=\"termCondition\"><a class=\"a\"  href=\"http://www.yahoo.com\" target=\"_blank\">Terms and conditions</a></label>\n      <label class=\"termCondition\"><a class=\"a\" href=\"http://www.yahoo.com\" target=\"_blank\">Privacy Policy</a></label>\n      <label (click)=\"navigateToContactUs()\"   class=\"termCondition contactUs\">Contact Us</label>\n      <label class=\"all-right\"><a class=\"a\" href=\"http://www.yahoo.com\" target=\"_blank\">© All Rights Reserved 2019</a></label>\n    \n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var FooterComponent = /** @class */ (function () {
    function FooterComponent(router) {
        var _this = this;
        this.router = router;
        this.hideFooter = false;
        this.router.events
            .subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                console.log("event.url", event.url);
                if (event.url === '/home/dashBoard/gst-form') {
                    _this.hideFooter = true;
                }
                else {
                    _this.hideFooter = false;
                }
            }
        });
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.no = localStorage.getItem("customerCareNo") == 'null' ? "--" : localStorage.getItem("customerCareNo");
        this.mob = "tel:" + this.no;
    };
    FooterComponent.prototype.navigateToContactUs = function () {
        this.router.navigate(['contactUs']);
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/shared/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared/loader/loader.component.css":
/*!****************************************************!*\
  !*** ./src/app/shared/loader/loader.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".loaderContainer {\n    position: fixed;\n    z-index: 999999999;\n    top: 0px;\n    width: 100%;\n    display: flex;\n    height: 100%;\n    background: rgba(2, 3, 14, 0.17);\n  }\n\n  #loaderMessage\n  {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  }\n\n  .sk-folding-cube {\n    left: 50%;\n    top: 45%;\n    position: fixed;\n    width: 45px;\n    height: 45px;\n    -webkit-transform: rotateZ(45deg);\n    transform: rotateZ(45deg);\n  }\n\n  .sk-folding-cube .sk-cube {\n    float: left;\n    width: 50%;\n    height: 50%;\n    position: relative;\n    -webkit-transform: scale(1.1);\n            transform: scale(1.1); \n  }\n\n  .sk-folding-cube .sk-cube:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: #3f51b5;\n    -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;\n            animation: sk-foldCubeAngle 2.4s infinite linear both;\n    -webkit-transform-origin: 100% 100%;\n            transform-origin: 100% 100%;\n  }\n\n  .sk-folding-cube .sk-cube2 {\n    -webkit-transform: scale(1.1) rotateZ(90deg);\n            transform: scale(1.1) rotateZ(90deg);\n  }\n\n  .sk-folding-cube .sk-cube3 {\n    -webkit-transform: scale(1.1) rotateZ(180deg);\n            transform: scale(1.1) rotateZ(180deg);\n  }\n\n  .sk-folding-cube .sk-cube4 {\n    -webkit-transform: scale(1.1) rotateZ(270deg);\n            transform: scale(1.1) rotateZ(270deg);\n  }\n\n  .sk-folding-cube .sk-cube2:before {\n    -webkit-animation-delay: 0.3s;\n            animation-delay: 0.3s;\n  }\n\n  .sk-folding-cube .sk-cube3:before {\n    -webkit-animation-delay: 0.0s;\n            animation-delay: 0.0s; \n  }\n\n  .sk-folding-cube .sk-cube4:before {\n    -webkit-animation-delay: 0.9s;\n            animation-delay: 0.9s;\n  }\n\n  @-webkit-keyframes sk-foldCubeAngle {\n    0%, 10% {\n      -webkit-transform: perspective(140px) rotateX(-180deg);\n              transform: perspective(140px) rotateX(-180deg);\n      opacity: 0; \n    } 25%, 75% {\n      -webkit-transform: perspective(140px) rotateX(0deg);\n              transform: perspective(140px) rotateX(0deg);\n      opacity: 1; \n    } 90%, 100% {\n      -webkit-transform: perspective(140px) rotateY(180deg);\n              transform: perspective(140px) rotateY(180deg);\n      opacity: 0; \n    } \n  }\n\n  @keyframes sk-foldCubeAngle {\n    0%, 10% {\n      -webkit-transform: perspective(140px) rotateX(-180deg);\n              transform: perspective(140px) rotateX(-180deg);\n      opacity: 0; \n    } 25%, 75% {\n      -webkit-transform: perspective(140px) rotateX(0deg);\n              transform: perspective(140px) rotateX(0deg);\n      opacity: 1; \n    } 90%, 100% {\n      -webkit-transform: perspective(140px) rotateY(180deg);\n              transform: perspective(140px) rotateY(180deg);\n      opacity: 0; \n    }\n  }\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFdBQVc7SUFDWCxhQUFhO0lBQ2IsWUFBWTtJQUNaLGdDQUFnQztFQUNsQzs7RUFFQTs7RUFFQSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFFBQVE7RUFDUix3Q0FBZ0M7VUFBaEMsZ0NBQWdDO0VBQ2hDOztFQUdGO0lBQ0ksU0FBUztJQUNULFFBQVE7SUFDUixlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7SUFDWixpQ0FBaUM7SUFDakMseUJBQXlCO0VBQzNCOztFQUVBO0lBQ0UsV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLDZCQUE2QjtZQUVyQixxQkFBcUI7RUFDL0I7O0VBQ0E7SUFDRSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7SUFDWix5QkFBeUI7SUFDekIsNkRBQTZEO1lBQ3JELHFEQUFxRDtJQUM3RCxtQ0FBbUM7WUFFM0IsMkJBQTJCO0VBQ3JDOztFQUNBO0lBQ0UsNENBQTRDO1lBQ3BDLG9DQUFvQztFQUM5Qzs7RUFDQTtJQUNFLDZDQUE2QztZQUNyQyxxQ0FBcUM7RUFDL0M7O0VBQ0E7SUFDRSw2Q0FBNkM7WUFDckMscUNBQXFDO0VBQy9DOztFQUNBO0lBQ0UsNkJBQTZCO1lBQ3JCLHFCQUFxQjtFQUMvQjs7RUFDQTtJQUNFLDZCQUE2QjtZQUNyQixxQkFBcUI7RUFDL0I7O0VBQ0E7SUFDRSw2QkFBNkI7WUFDckIscUJBQXFCO0VBQy9COztFQUNBO0lBQ0U7TUFDRSxzREFBc0Q7Y0FDOUMsOENBQThDO01BQ3RELFVBQVU7SUFDWixFQUFFO01BQ0EsbURBQW1EO2NBQzNDLDJDQUEyQztNQUNuRCxVQUFVO0lBQ1osRUFBRTtNQUNBLHFEQUFxRDtjQUM3Qyw2Q0FBNkM7TUFDckQsVUFBVTtJQUNaO0VBQ0Y7O0VBRUE7SUFDRTtNQUNFLHNEQUFzRDtjQUM5Qyw4Q0FBOEM7TUFDdEQsVUFBVTtJQUNaLEVBQUU7TUFDQSxtREFBbUQ7Y0FDM0MsMkNBQTJDO01BQ25ELFVBQVU7SUFDWixFQUFFO01BQ0EscURBQXFEO2NBQzdDLDZDQUE2QztNQUNyRCxVQUFVO0lBQ1o7RUFDRiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9sb2FkZXIvbG9hZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9hZGVyQ29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogOTk5OTk5OTk5O1xuICAgIHRvcDogMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMiwgMywgMTQsIDAuMTcpO1xuICB9XG5cbiAgI2xvYWRlck1lc3NhZ2VcbiAge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB9XG5cblxuLnNrLWZvbGRpbmctY3ViZSB7XG4gICAgbGVmdDogNTAlO1xuICAgIHRvcDogNDUlO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogNDVweDtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVooNDVkZWcpO1xuICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XG4gIH1cbiAgXG4gIC5zay1mb2xkaW5nLWN1YmUgLnNrLWN1YmUge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA1MCU7XG4gICAgaGVpZ2h0OiA1MCU7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgICAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyBcbiAgfVxuICAuc2stZm9sZGluZy1jdWJlIC5zay1jdWJlOmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Y1MWI1O1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1mb2xkQ3ViZUFuZ2xlIDIuNHMgaW5maW5pdGUgbGluZWFyIGJvdGg7XG4gICAgICAgICAgICBhbmltYXRpb246IHNrLWZvbGRDdWJlQW5nbGUgMi40cyBpbmZpbml0ZSBsaW5lYXIgYm90aDtcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcbiAgICAgICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMTAwJTtcbiAgfVxuICAuc2stZm9sZGluZy1jdWJlIC5zay1jdWJlMiB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWig5MGRlZyk7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSkgcm90YXRlWig5MGRlZyk7XG4gIH1cbiAgLnNrLWZvbGRpbmctY3ViZSAuc2stY3ViZTMge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMTgwZGVnKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDE4MGRlZyk7XG4gIH1cbiAgLnNrLWZvbGRpbmctY3ViZSAuc2stY3ViZTQge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjEpIHJvdGF0ZVooMjcwZGVnKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKSByb3RhdGVaKDI3MGRlZyk7XG4gIH1cbiAgLnNrLWZvbGRpbmctY3ViZSAuc2stY3ViZTI6YmVmb3JlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zcztcbiAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcbiAgfVxuICAuc2stZm9sZGluZy1jdWJlIC5zay1jdWJlMzpiZWZvcmUge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjBzO1xuICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjBzOyBcbiAgfVxuICAuc2stZm9sZGluZy1jdWJlIC5zay1jdWJlNDpiZWZvcmUge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjlzO1xuICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjlzO1xuICB9XG4gIEAtd2Via2l0LWtleWZyYW1lcyBzay1mb2xkQ3ViZUFuZ2xlIHtcbiAgICAwJSwgMTAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgtMTgwZGVnKTtcbiAgICAgIG9wYWNpdHk6IDA7IFxuICAgIH0gMjUlLCA3NSUge1xuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVYKDBkZWcpO1xuICAgICAgb3BhY2l0eTogMTsgXG4gICAgfSA5MCUsIDEwMCUge1xuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVkoMTgwZGVnKTtcbiAgICAgIG9wYWNpdHk6IDA7IFxuICAgIH0gXG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgc2stZm9sZEN1YmVBbmdsZSB7XG4gICAgMCUsIDEwJSB7XG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTQwcHgpIHJvdGF0ZVgoLTE4MGRlZyk7XG4gICAgICBvcGFjaXR5OiAwOyBcbiAgICB9IDI1JSwgNzUlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWCgwZGVnKTtcbiAgICAgIG9wYWNpdHk6IDE7IFxuICAgIH0gOTAlLCAxMDAlIHtcbiAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxNDBweCkgcm90YXRlWSgxODBkZWcpO1xuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDE0MHB4KSByb3RhdGVZKDE4MGRlZyk7XG4gICAgICBvcGFjaXR5OiAwOyBcbiAgICB9XG4gIH1cblxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/loader/loader.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/loader/loader.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loaderContainer center\" *ngIf=\"showLoader\">\n    <div class=\"sk-folding-cube\">\n        <div class=\"sk-cube1 sk-cube\"></div>\n        <div class=\"sk-cube2 sk-cube\"></div>\n        <div class=\"sk-cube4 sk-cube\"></div>\n        <div class=\"sk-cube3 sk-cube\"></div>\n      </div>\n      \n    \n</div>\n"

/***/ }),

/***/ "./src/app/shared/loader/loader.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/loader/loader.component.ts ***!
  \***************************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loader.service */ "./src/app/shared/loader/loader.service.ts");



var LoaderComponent = /** @class */ (function () {
    function LoaderComponent(loaderService) {
        this.loaderService = loaderService;
    }
    LoaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loaderService.getLoaderStatus().subscribe(function (resp) {
            _this.showLoader = resp;
        });
    };
    LoaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-loader',
            template: __webpack_require__(/*! ./loader.component.html */ "./src/app/shared/loader/loader.component.html"),
            styles: [__webpack_require__(/*! ./loader.component.css */ "./src/app/shared/loader/loader.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"]])
    ], LoaderComponent);
    return LoaderComponent;
}());



/***/ }),

/***/ "./src/app/shared/loader/loader.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/loader/loader.service.ts ***!
  \*************************************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this.loaderStatus = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    LoaderService.prototype.showLoader = function () {
        this.loaderStatus.next(true);
    };
    LoaderService.prototype.hideLoader = function () {
        this.loaderStatus.next(false);
    };
    LoaderService.prototype.getLoaderStatus = function () {
        return this.loaderStatus.asObservable();
    };
    LoaderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());



/***/ }),

/***/ "./src/app/shared/nav/nav.component.css":
/*!**********************************************!*\
  !*** ./src/app/shared/nav/nav.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\n    color: #fff;\n    background-color: #2457a7;\n    width: 100%;\n    height: 56px;\n    line-height: 56px;\n}\n.background{\n    background-color: #2457a7;\n}\n.logo-img {\n    width: 50px;\n    height: 38px;\n    -o-object-fit: contain;\n       object-fit: contain;\n  }\nnav .brand-logo {\n    position: absolute;\n    color: #fff;\n    display: inline-block;\n    font-size: 2.1rem;\n    padding: 7px;\n}\nnav ul a {\n  transition: background-color .3s;\n  font-size: 1rem;\n  color: navy;\n  display: block;\n  padding: 0 15px;\n  cursor: pointer;\n}\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL25hdi9uYXYuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCx5QkFBeUI7SUFDekIsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7QUFDQTtJQUNJLHlCQUF5QjtBQUM3QjtBQU1BO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixzQkFBbUI7T0FBbkIsbUJBQW1CO0VBQ3JCO0FBR0E7SUFDRSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsWUFBWTtBQUNoQjtBQUVBO0VBQ0UsZ0NBQWdDO0VBQ2hDLGVBQWU7RUFDZixXQUFXO0VBQ1gsY0FBYztFQUNkLGVBQWU7RUFDZixlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL25hdi9uYXYuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIm5hdiB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI0NTdhNztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDU2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDU2cHg7XG59XG4uYmFja2dyb3VuZHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjQ1N2E3O1xufVxuXG5cblxuXG5cbi5sb2dvLWltZyB7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgaGVpZ2h0OiAzOHB4O1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIH1cblxuXG4gIG5hdiAuYnJhbmQtbG9nbyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDIuMXJlbTtcbiAgICBwYWRkaW5nOiA3cHg7XG59XG5cbm5hdiB1bCBhIHtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgY29sb3I6IG5hdnk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/nav/nav.component.html":
/*!***********************************************!*\
  !*** ./src/app/shared/nav/nav.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"navbar-fixed\" *ngIf=\"!(getHideNavBarStatus() | async)\">\n  <nav>\n    <div class=\"nav-wrapper\" [style.background-color]=\"backGroundColor\">\n      <a href=\"#!\" class=\"brand-logo\">\n        <img src=\"/assets/login/images/logo.png\" class=\"logo-img\" alt=\"logo\">\n      </a>\n      <ul class=\"right hide-on-med-and-down\">\n        <li><a>Vahana Home</a></li>\n        <li><a [routerLink]=\"'auth/login'\">SignIn</a></li>\n      </ul>\n    </div>   \n  </nav>\n</div>\n\n\n\n<!-- side menu slider value-->\n\n\n<div class=\"container sidenav1 hide-menu\">\n  <ul id=\"slide-out\" class=\"sidenav\">\n    <li>\n      <div class=\"user-view\">\n        <div class=\"background\">\n          <!-- <img src=\"images/office.jpg\"> -->\n        </div>\n        <!-- <a href=\"#user\"><img class=\"circle\" src=\"images/yuna.jpg\"></a> -->\n        <a href=\"#name\"><span class=\"white-text name\">John Doe</span></a>\n        <a href=\"#email\"><span class=\"white-text email\">Muk@gmail.com</span></a>\n      </div>\n    </li>\n    <li><a href=\"#!\"><i class=\"material-icons\">cloud</i>First Link With Icon</a></li>\n    <li><a href=\"#!\">Second Link</a></li>\n    <li>\n      <div class=\"divider\"></div>\n    </li>\n    <li><a class=\"subheader\">Subheader</a></li>\n    <li><a class=\"waves-effect\" href=\"#!\">Third Link With Waves</a></li>\n  </ul>\n</div>\n\n<!-- side menu slider value-->"

/***/ }),

/***/ "./src/app/shared/nav/nav.component.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/nav/nav.component.ts ***!
  \*********************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! materialize-css */ "./node_modules/materialize-css/dist/js/materialize.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(materialize_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav.service */ "./src/app/shared/nav/nav.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var NavComponent = /** @class */ (function () {
    function NavComponent(navService, location, router) {
        this.navService = navService;
        this.location = location;
        this.router = router;
        this.headerName = 'Home';
        this.logo = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.icon = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.icons = {};
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.headerNameSubsription = this.navService.headerName.subscribe(function (value) {
            _this.headerName = value;
        });
        this.clientDetailSubscription = this.navService.getClientDetail().subscribe(function (clientDetail) {
            _this.clientDetail = clientDetail;
        });
        this.getBackGroundColor();
        this.setLogo();
    };
    NavComponent.prototype.isIconPresent = function () {
        return this.icon.asObservable();
    };
    NavComponent.prototype.isLogoPresent = function () {
        return this.logo.asObservable();
    };
    NavComponent.prototype.setLogo = function () {
        // this.campaignService.getLogo().subscribe((value) => {
        //   if(value){
        //   const logo = value['logo'];
        //   const icon = value['icon'];
        //   this.icons['logo'] = logo;
        //   this.icons['icon'] = icon;
        //   if (logo) {
        //     return this.logo.next(true);
        //   }
        //   if (icon) {
        //     return this.icon.next(true);
        //   }
        // }
        // });
    };
    NavComponent.prototype.ngAfterViewInit = function () {
        this.sideNav();
    };
    NavComponent.prototype.sideNav = function () {
        var elems = document.querySelectorAll('.sidenav');
        // tslint:disable-next-line:curly
        if (elems)
            this.instance = materialize_css__WEBPACK_IMPORTED_MODULE_2__["Sidenav"].init(elems, {});
    };
    NavComponent.prototype.goBack = function () {
        this.location.back();
        this.navService.setHideBackButton(true);
    };
    NavComponent.prototype.ngOnDestroy = function () {
        if (this.headerNameSubsription !== undefined) {
            this.headerNameSubsription.unsubscribe();
            this.clientDetailSubscription.unsubscribe();
        }
    };
    /* This method set the color of NavBar */
    NavComponent.prototype.getBackGroundColor = function () {
        var _this = this;
        this.navService.getBackGroundColor().subscribe(function (color) {
            _this.backGroundColor = color;
        });
    };
    /* End-------------------------*/
    NavComponent.prototype.getHideNavBarStatus = function () {
        return this.navService.getHideNavBar();
    };
    NavComponent.prototype.getHideBackButtonStatus = function () {
        return this.navService.getHideBackButton();
    };
    NavComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/shared/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/shared/nav/nav.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_nav_service__WEBPACK_IMPORTED_MODULE_3__["NavService"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/app/shared/nav/nav.service.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/nav/nav.service.ts ***!
  \*******************************************/
/*! exports provided: NavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavService", function() { return NavService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var NavService = /** @class */ (function () {
    function NavService() {
        this.headerName = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('Home');
        this.clientDetail = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('');
        this.backGroundColor = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('#2457a7');
        this.hideBackButton = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this.hideNavBar = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    /* set client Detail */
    NavService.prototype.setClientDetail = function (clientDetail) {
        this.clientDetail.next(clientDetail);
    };
    /* End of set client Detail */
    /* get client Detail */
    NavService.prototype.getClientDetail = function () {
        return this.clientDetail.asObservable();
    };
    /* End of get client Detail */
    NavService.prototype.setNavHeaderName = function (name) {
        this.headerName.next(name);
    };
    NavService.prototype.getNavHeaderName = function () {
        return this.headerName.asObservable();
    };
    NavService.prototype.setBackgroundColor = function (color) {
        this.backGroundColor.next(color);
    };
    NavService.prototype.getBackGroundColor = function () {
        return this.backGroundColor.asObservable();
    };
    NavService.prototype.setHideBackButton = function (flag) {
        this.hideBackButton.next(flag);
    };
    NavService.prototype.getHideBackButton = function () {
        return this.hideBackButton.asObservable();
    };
    NavService.prototype.setHideNavBar = function (flag) {
        this.hideNavBar.next(flag);
    };
    NavService.prototype.getHideNavBar = function () {
        return this.hideNavBar.asObservable();
    };
    NavService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], NavService);
    return NavService;
}());



/***/ }),

/***/ "./src/app/shared/notification-modal/notification-modal.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/shared/notification-modal/notification-modal.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"modal1\" class=\"modal\">\n  <div class=\"modal-content\">\n    <h5>{{messageHeader}}</h5>\n    <p>{{messageBody}}</p>\n  </div>\n  <div class=\"modal-footer\">\n    <label class=\"modal-close btn-flat\" (click)=\"userResponse('ok')\">Ok</label>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/shared/notification-modal/notification-modal.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/shared/notification-modal/notification-modal.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9ub3RpZmljYXRpb24tbW9kYWwvbm90aWZpY2F0aW9uLW1vZGFsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/shared/notification-modal/notification-modal.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/shared/notification-modal/notification-modal.component.ts ***!
  \***************************************************************************/
/*! exports provided: NotificationModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModalComponent", function() { return NotificationModalComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! materialize-css */ "./node_modules/materialize-css/dist/js/materialize.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(materialize_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notificationModalService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notificationModalService */ "./src/app/shared/notification-modal/notificationModalService.ts");




var NotificationModalComponent = /** @class */ (function () {
    function NotificationModalComponent(modalService) {
        this.modalService = modalService;
    }
    NotificationModalComponent.prototype.ngOnInit = function () {
        this.initModal();
    };
    /* get Message Header */
    NotificationModalComponent.prototype.getMessageHeader = function () {
        return this.messageHeader;
    };
    /* End of getting MessageBody */
    /* get Message Header */
    NotificationModalComponent.prototype.getMessageBody = function () {
        return this.messageBody;
    };
    /* End of getting MessageBody*/
    /* call this method for opening the modal */
    NotificationModalComponent.prototype.openModal = function () {
        this.modalInstance[0].open();
    };
    /* End of call this method for opening the modal */
    /* call this method for opening the modal */
    NotificationModalComponent.prototype.closeModal = function () {
        this.modalInstance[0].close();
    };
    /* End of call this method for opening the modal *
 
 
 
   /* initialise the modal */
    NotificationModalComponent.prototype.initModal = function () {
        var self = this;
        document.addEventListener('DOMContentLoaded', function () {
            self.modalElements = document.querySelectorAll('.modal');
            self.modalInstance = materialize_css__WEBPACK_IMPORTED_MODULE_2__["Modal"].init(self.modalElements, { dismissible: false });
            self.getModalService();
        });
    };
    /* initialise the modal */
    NotificationModalComponent.prototype.userResponse = function (type) {
        this.modalService.notifySubscriber.next(type);
    };
    NotificationModalComponent.prototype.getModalService = function () {
        var _this = this;
        this.modalService.getModalStatus().subscribe(function (modalObj) {
            _this.messageHeader = modalObj.header;
            _this.messageBody = modalObj.message;
            if (modalObj.status) {
                _this.openModal();
            }
            else {
                _this.closeModal();
            }
        });
    };
    NotificationModalComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-notification-modal',
            template: __webpack_require__(/*! ./notification-modal.component.html */ "./src/app/shared/notification-modal/notification-modal.component.html"),
            styles: [__webpack_require__(/*! ./notification-modal.component.scss */ "./src/app/shared/notification-modal/notification-modal.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_notificationModalService__WEBPACK_IMPORTED_MODULE_3__["ModalService"]])
    ], NotificationModalComponent);
    return NotificationModalComponent;
}());



/***/ }),

/***/ "./src/app/shared/notification-modal/notificationModalService.ts":
/*!***********************************************************************!*\
  !*** ./src/app/shared/notification-modal/notificationModalService.ts ***!
  \***********************************************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var ModalService = /** @class */ (function () {
    function ModalService() {
        this.modal = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.notifySubscriber = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('');
    }
    ModalService.prototype.openModal = function (header, message) {
        this.modal.next({ header: header, message: message, status: true });
        return this.notifySubscriber.asObservable();
    };
    ModalService.prototype.closeModal = function () {
        this.modal.next({ header: '', message: '', status: false });
    };
    ModalService.prototype.getModalStatus = function () {
        return this.modal.asObservable();
    };
    ModalService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], ModalService);
    return ModalService;
}());



/***/ }),

/***/ "./src/app/shared/notify/notify.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/notify/notify.service.ts ***!
  \*************************************************/
/*! exports provided: NotifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifyService", function() { return NotifyService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! materialize-css */ "./node_modules/materialize-css/dist/js/materialize.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(materialize_css__WEBPACK_IMPORTED_MODULE_2__);



var NotifyService = /** @class */ (function () {
    function NotifyService() {
    }
    // for showing the toast
    NotifyService.prototype.showToast = function (message, status) {
        switch (status) {
            case 'error':
                materialize_css__WEBPACK_IMPORTED_MODULE_2__["toast"]({ html: message, classes: 'color: red' });
                break;
            case 'success':
                materialize_css__WEBPACK_IMPORTED_MODULE_2__["toast"]({ html: message, classes: 'color: green' });
                break;
            default:
                materialize_css__WEBPACK_IMPORTED_MODULE_2__["toast"]({ html: message, classes: 'color: black' });
                break;
        }
    };
    NotifyService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NotifyService);
    return NotifyService;
}());



/***/ }),

/***/ "./src/app/shared/services/AppConstant.ts":
/*!************************************************!*\
  !*** ./src/app/shared/services/AppConstant.ts ***!
  \************************************************/
/*! exports provided: AppConstant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConstant", function() { return AppConstant; });
var AppConstant = /** @class */ (function () {
    function AppConstant() {
    }
    AppConstant.ORG_DESC = 'orgDescription';
    AppConstant.ORG_DOMAIN = 'orgDomain';
    AppConstant.ORG_ID = 'orgId';
    AppConstant.ORG_LOGO = 'orgLogo';
    AppConstant.ORG_NAME = 'orgName';
    AppConstant.EMAIL = 'email';
    AppConstant.MOBILE = 'mobileNumber';
    AppConstant.ORGANIGATION_NAME = 'organisationName';
    AppConstant.USER_NAME = "userName";
    AppConstant.USER_DETAIL = "userDetail";
    AppConstant.SIGNUP_EMAIL = "signupemail";
    AppConstant.APP_ID = "selectedApp";
    AppConstant.COMMUNICATION = "communication";
    AppConstant.CITY = "city";
    AppConstant.COUNTRY = "country";
    AppConstant.ADDRESS = "address";
    AppConstant.FULL_NAME = "fullName";
    AppConstant.ORGANIZATION_NAME = "organisationName";
    AppConstant.POSTAL_CODE = "postalCode";
    AppConstant.STATE = "state";
    AppConstant.DEFAULT_ORG_ID = 'DefaultOrgId';
    AppConstant.DEFAULT_ORG_NAME = 'DefaultOrgName';
    return AppConstant;
}());



/***/ }),

/***/ "./src/app/shared/services/appService.module.ts":
/*!******************************************************!*\
  !*** ./src/app/shared/services/appService.module.ts ***!
  \******************************************************/
/*! exports provided: AppServiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServiceModule", function() { return AppServiceModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _platwareService_platware_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./platwareService/platware.service */ "./src/app/shared/services/platwareService/platware.service.ts");
/* harmony import */ var _platwareService_encryption_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./platwareService/encryption.service */ "./src/app/shared/services/platwareService/encryption.service.ts");
/* harmony import */ var _platwareService_utility_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./platwareService/utility.service */ "./src/app/shared/services/platwareService/utility.service.ts");







var AppServiceModule = /** @class */ (function () {
    function AppServiceModule() {
    }
    AppServiceModule_1 = AppServiceModule;
    AppServiceModule.forRoot = function () {
        return {
            ngModule: AppServiceModule_1,
            providers: [
                _platwareService_platware_service__WEBPACK_IMPORTED_MODULE_4__["PlatwareService"], _platwareService_encryption_service__WEBPACK_IMPORTED_MODULE_5__["EncryptionService"], _platwareService_utility_service__WEBPACK_IMPORTED_MODULE_6__["UtilityService"]
            ]
        };
    };
    var AppServiceModule_1;
    AppServiceModule = AppServiceModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]],
            exports: [],
        })
    ], AppServiceModule);
    return AppServiceModule;
}());



/***/ }),

/***/ "./src/app/shared/services/platwareService/encryption.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/shared/services/platwareService/encryption.service.ts ***!
  \***********************************************************************/
/*! exports provided: EncryptionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncryptionService", function() { return EncryptionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../PlatwareClient/pwCore */ "./PlatwareClient/pwCore.js");
/* harmony import */ var _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_2__);



var EncryptionService = /** @class */ (function () {
    function EncryptionService() {
    }
    EncryptionService.prototype.encryptValue = function (value) {
        return _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_2___default.a.AESEnc(value, 'decimalsecretkey');
    };
    EncryptionService.prototype.decryptValue = function (value) {
        return _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_2___default.a.AESDec(value, 'decimalsecretkey');
    };
    EncryptionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EncryptionService);
    return EncryptionService;
}());



/***/ }),

/***/ "./src/app/shared/services/platwareService/platware.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/shared/services/platwareService/platware.service.ts ***!
  \*********************************************************************/
/*! exports provided: PlatwareService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatwareService", function() { return PlatwareService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _PlatwareClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../PlatwareClient */ "./PlatwareClient/index.js");
/* harmony import */ var _PlatwareClient__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_PlatwareClient__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");





var PlatwareService = /** @class */ (function () {
    function PlatwareService() {
    }
    PlatwareService.prototype.callPlatware = function (body, headers, customEnv) {
        var envObj = customEnv !== undefined ? customEnv : _environments_environment__WEBPACK_IMPORTED_MODULE_4__;
        var sendResponse = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.writeLog('call platware with body and headers', body, headers);
        this.setLogger(true);
        console.log(envObj);
        this.callPlatwareLibrary(body, headers, envObj, sendResponse);
        return sendResponse;
    };
    // call platware library
    PlatwareService.prototype.callPlatwareLibrary = function (body, header, envObj, sendResponse) {
        var that = this;
        _PlatwareClient__WEBPACK_IMPORTED_MODULE_3__["executeApi"](envObj, body, header, function (r) {
            that.writeLog('call platware sdk res', r);
            that.responseHandler(r, that.getServiceName(r.data), sendResponse);
        });
    };
    // response handling
    PlatwareService.prototype.responseHandler = function (data, serArr, sendResponse) {
        this.writeLog('response handling');
        if (data.status) {
            this.dataHandler(data.data, serArr, sendResponse);
        }
        else {
            this.sendErrorData(data, sendResponse);
        }
    };
    /* response body data handler */
    PlatwareService.prototype.dataHandler = function (data, serArr, sendResponse) {
        this.writeLog('response body data handling');
        // tslint:disable-next-line:forin
        for (var key in serArr) {
            for (var d in data) {
                if (d === serArr[key]) {
                    var respObj = {};
                    if (data[d][0].hasOwnProperty('data')) {
                        respObj[d] = data[d][0].data[0].response || data[d][0].data[0];
                        this.sendSuccessData(respObj, sendResponse);
                    }
                    else {
                        respObj[d] = data[d][0].error;
                        this.sendErrorData(respObj, sendResponse);
                    }
                }
            }
        }
    };
    /* End of response body data handler */
    /* this Function emit the success data Obserable value  */
    PlatwareService.prototype.sendSuccessData = function (data, sendResponse) {
        sendResponse.next(data);
    };
    /* End of this Function emit the Obserable value  */
    /* this Function emit the error data Obserable value  */
    PlatwareService.prototype.sendErrorData = function (data, sendResponse) {
        sendResponse.error(data);
    };
    /* End of this Function emit the error  Obserable value  */
    /* This is a function to get service Name from body */
    PlatwareService.prototype.getServiceName = function (body) {
        if (body) {
            // tslint:disable-next-line:no-string-literal
            delete body['status'];
            this.writeLog(Object.keys(body));
            return Object.keys(body);
        }
    };
    /* == End of This is a function to get service Name from body == */
    /* write log to console */
    PlatwareService.prototype.writeLog = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        if (this.logger) {
            console.log(message);
        }
    };
    /* === End of write log to console =====*/
    /* function to enable and disable the logging */
    PlatwareService.prototype.setLogger = function (flag) {
        this.logger = flag;
    };
    PlatwareService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PlatwareService);
    return PlatwareService;
}());



/***/ }),

/***/ "./src/app/shared/services/platwareService/utility.service.ts":
/*!********************************************************************!*\
  !*** ./src/app/shared/services/platwareService/utility.service.ts ***!
  \********************************************************************/
/*! exports provided: UtilityService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilityService", function() { return UtilityService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _encryption_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./encryption.service */ "./src/app/shared/services/platwareService/encryption.service.ts");
/* harmony import */ var _notify_notify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../notify/notify.service */ "./src/app/shared/notify/notify.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _loader_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var _AppConstant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AppConstant */ "./src/app/shared/services/AppConstant.ts");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! materialize-css */ "./node_modules/materialize-css/dist/js/materialize.js");
/* harmony import */ var materialize_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(materialize_css__WEBPACK_IMPORTED_MODULE_8__);









var UtilityService = /** @class */ (function () {
    function UtilityService(encryptionService, notifyService, router, loaderService) {
        this.encryptionService = encryptionService;
        this.notifyService = notifyService;
        this.router = router;
        this.loaderService = loaderService;
    }
    /* write log to console */
    UtilityService.prototype.writeLog = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        if (this.logger) {
            console.log(message);
        }
    };
    /* === End of write log to console =====*/
    /* function to enable and disable the logging */
    UtilityService.prototype.setLogger = function (flag) {
        this.logger = flag;
    };
    /* == End of function to enable and disable the logging == */
    UtilityService.prototype.isNotNull = function (value) {
        if (value === 'null' || value === null || value === undefined || value.trim() === '') {
            return false;
        }
        else {
            return true;
        }
    };
    UtilityService.prototype.getObjectByKey = function (data, key) {
        return lodash__WEBPACK_IMPORTED_MODULE_2__["result"](data, key);
    };
    UtilityService.prototype.picKKeysFromObject = function (data, model) {
        return lodash__WEBPACK_IMPORTED_MODULE_2__["pick"](data, lodash__WEBPACK_IMPORTED_MODULE_2__["keys"](model));
    };
    /* This method copmares the two date and return boolean */
    UtilityService.prototype.compareTwoDates = function (firstDateString, secondDateString) {
        return (Date.parse(firstDateString) > Date.parse(secondDateString));
    };
    /* This method copmares the two date and return boolean */
    UtilityService.prototype.compareDates = function (validateTo) {
        return Date.parse(validateTo) >= new Date().getTime();
    };
    /* End of This method copmares the two date and return boolean */
    UtilityService.prototype.getUpdatedArray = function (array, type, id) {
        switch (type) {
            // tslint:disable-next-line:object-literal-key-quotes
            case 'ADD': return lodash__WEBPACK_IMPORTED_MODULE_2__["concat"](array, [{ 'id': id, 'value': true }]);
            case 'REMOVE': return lodash__WEBPACK_IMPORTED_MODULE_2__["dropRightWhile"](array, function (o) { return o.id === id; });
        }
    };
    UtilityService.prototype.getQueryStringValue = function (href, key) {
        var url = decodeURI(decodeURIComponent(href));
        return this.getQueryString(key, url);
    };
    UtilityService.prototype.getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var stringValue = reg.exec(href);
        return stringValue ? stringValue[1] : null;
    };
    UtilityService.prototype.getQueryObj = function (url) {
        var params = {};
        // tslint:disable-next-line:only-arrow-functions
        (url + '?').split('?')[1].split('&').forEach(function (pair) {
            pair = (pair + '=').split('=').map(decodeURIComponent);
            if (pair[0].length) {
                params[pair[0]] = pair[1];
            }
        });
        return params;
    };
    /* get Geolocation */
    UtilityService.prototype.getCurrentLocation = function (flag) {
        if (flag) {
            window.navigator.geolocation.getCurrentPosition(function (pos) { console.log(pos); }, function (err) { console.log(err); }, {});
        }
    };
    /* End of get Geolocation */
    /* Return the date in ISO Format */
    UtilityService.prototype.getDateInISOFormat = function () {
        return new Date().toISOString();
    };
    /* End of Return the date in ISO Format */
    /* Start of getting localStorage Value */
    UtilityService.prototype.getLocalStorage = function (key) {
        var value = localStorage.getItem(key);
        if (value) {
            return this.encryptionService.decryptValue(value);
        }
        else {
            return null;
        }
    };
    /* End of getting localStorage Value */
    UtilityService.prototype.setLocalStorage = function (key, value) {
        var encryptedValue = this.encryptionService.encryptValue(value);
        localStorage.setItem(key, encryptedValue);
    };
    UtilityService.prototype.removeKeyFromLocalStorage = function (key) {
        localStorage.removeItem(key);
    };
    UtilityService.prototype.clearLocalStorage = function () {
        localStorage.clear();
    };
    /* method will return any value from based on key from config*/
    UtilityService.prototype.getValueFromConfig = function (key) {
        var value = this.getLocalStorage('config');
        if (value) {
            var config = JSON.parse((value));
            return config[key];
        }
        return null;
    };
    /* End of getting localStorage Value */
    UtilityService.prototype.scrollToTop = function () {
        window.scroll(0, 0);
    };
    /* save user details */
    UtilityService.prototype.saveUserDetail = function (response) {
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORG_DESC] = response.orgDescription;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORG_DOMAIN] = response.orgDomain;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORG_ID] = response.orgId;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].DEFAULT_ORG_ID] = response.orgId;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORG_LOGO] = response.orgLogo;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORG_NAME] = response.orgName;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].DEFAULT_ORG_NAME] = response.orgName;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].EMAIL] = response.userDetails.email;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].MOBILE] = response.userDetails.mobileNumber;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].ORGANIGATION_NAME] = response.userDetails.organisationName;
        response[_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].USER_NAME] = response.userDetails.userName;
        console.log(response);
        this.setLocalStorage(_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].USER_DETAIL, JSON.stringify(response));
    };
    UtilityService.prototype.updateUserDetail = function (key, value) {
        var userDetail = this.getLocalStorage(_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].USER_DETAIL);
        if (userDetail) {
            userDetail = JSON.parse((userDetail));
            userDetail[key] = value;
            this.setLocalStorage(_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].USER_DETAIL, JSON.stringify(userDetail));
        }
    };
    /* method will return any value from based on key from config*/
    UtilityService.prototype.getValueFromUserDetail = function (key) {
        var value = this.getLocalStorage(_AppConstant__WEBPACK_IMPORTED_MODULE_7__["AppConstant"].USER_DETAIL);
        if (value) {
            var config = JSON.parse((value));
            return config[key];
        }
        return null;
    };
    /* End of getting localStorage Value */
    UtilityService.prototype.getError = function (value, requestName) {
        var errorResponse = value[requestName];
        var error = '';
        if (errorResponse === undefined) {
            error = value.erroMessage ? value.erroMessage : (value.message ? value.message : 'Something went wrong!');
        }
        else if (errorResponse.hasOwnProperty('errorResponse') && errorResponse.errorResponse != null) {
            error = errorResponse.errorResponse;
        }
        else if (errorResponse.hasOwnProperty('message')) {
            error = errorResponse.message;
        }
        else if (errorResponse.hasOwnProperty('errorHint')) {
            error = errorResponse.errorHint + " " + errorResponse.messageTrace;
        }
        else {
            error = value.erroMessage ? value.erroMessage : 'Something went wrong!', 'error';
        }
        materialize_css__WEBPACK_IMPORTED_MODULE_8__["toast"]({ html: error, classes: 'red darken-1' });
    };
    UtilityService.prototype.successMessage = function (resposne, requestName, defaultMessage) {
        var errorResponse = resposne[requestName];
        var success = defaultMessage;
        if (errorResponse.hasOwnProperty('message')) {
            success = errorResponse.message;
        }
        if (success) {
            materialize_css__WEBPACK_IMPORTED_MODULE_8__["toast"]({ html: success, classes: 'green darken-1' });
        }
    };
    UtilityService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_encryption_service__WEBPACK_IMPORTED_MODULE_3__["EncryptionService"],
            _notify_notify_service__WEBPACK_IMPORTED_MODULE_4__["NotifyService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _loader_loader_service__WEBPACK_IMPORTED_MODULE_6__["LoaderService"]])
    ], UtilityService);
    return UtilityService;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/shared/nav/nav.component.ts");
/* harmony import */ var _loader_loader_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader/loader.component */ "./src/app/shared/loader/loader.component.ts");
/* harmony import */ var _nav_nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nav/nav.service */ "./src/app/shared/nav/nav.service.ts");
/* harmony import */ var _loader_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loader/loader.service */ "./src/app/shared/loader/loader.service.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/shared/footer/footer.component.ts");
/* harmony import */ var _notification_modal_notification_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notification-modal/notification-modal.component */ "./src/app/shared/notification-modal/notification-modal.component.ts");
/* harmony import */ var _notification_modal_notificationModalService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notification-modal/notificationModalService */ "./src/app/shared/notification-modal/notificationModalService.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_appService_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/appService.module */ "./src/app/shared/services/appService.module.ts");












/*
  * This is shared modules which consist of:-
    1) Loader
    2) Toast
    3) NavBar
    4) Modals

 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                _loader_loader_service__WEBPACK_IMPORTED_MODULE_6__["LoaderService"], _nav_nav_service__WEBPACK_IMPORTED_MODULE_5__["NavService"], _notification_modal_notificationModalService__WEBPACK_IMPORTED_MODULE_9__["ModalService"]
            ]
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_nav_nav_component__WEBPACK_IMPORTED_MODULE_3__["NavComponent"], _loader_loader_component__WEBPACK_IMPORTED_MODULE_4__["LoaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"], _notification_modal_notification_modal_component__WEBPACK_IMPORTED_MODULE_8__["NotificationModalComponent"]],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"], _services_appService_module__WEBPACK_IMPORTED_MODULE_11__["AppServiceModule"].forRoot()],
            exports: [_nav_nav_component__WEBPACK_IMPORTED_MODULE_3__["NavComponent"], _loader_loader_component__WEBPACK_IMPORTED_MODULE_4__["LoaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"], _notification_modal_notification_modal_component__WEBPACK_IMPORTED_MODULE_8__["NotificationModalComponent"]],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//    //"envConfig": "DtFOT4bUJ8y5zR2FnnkpewOKE+Q1oqcav2SAP6abvHA18z56dQQKs+u1AAhZzWpyQ4Q0sMTxC9ad7pn/EkIC4u1b9bMrWEsB8TAuSEgH3u0KWwtvI5UYcdaaSBnck9oyiWI7t9NcHCU96LAAvqavlQY+d0+mkWhXHsmarI8gGSjeDu1x9joeAh+bSx0QYGc9j4431dl3QOlm0L3o+7a16sFqVExCnydfD+OOCUP8vNtBLPMwUkW3Zul8CU0+qLjW2FGNroRStNUPL5J9ohVfCmiycVcad3PdNj+TJGOTdLZQvXvJzCSwkMx158GF6T5Q"
var environment = {
    production: true,
    envProps: {},
    env: 'dev',
    version: "1.0.3",
    envPropsKey: "decimalsecretkey",
    enableLogging: true
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PlatwareClient/pwCore */ "./PlatwareClient/pwCore.js");
/* harmony import */ var _PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    getEnvConfig();
}
function getEnvConfig() {
    var http = new XMLHttpRequest();
    var timeStamp = +new Date();
    http.timeout = 10000;
    http.open('GET', "/assets/login/data/environment.json?" + timeStamp, true);
    http.send(JSON.stringify(''));
    http.onerror = function (error) {
        reload(http.status);
    };
    http.ontimeout = function () {
        reload(http.status);
    };
    http.onreadystatechange = function (e) {
        if (http.readyState === 4) {
            if (http.status === 200) {
                try {
                    var res = JSON.parse(http.response);
                    setEnv(res);
                    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);
                }
                catch (e) {
                    alert('Configured environment in: /assets/data.environment.json is wrong. Please recheck your json file.');
                    return;
                }
            }
            else {
                alert('Environmet File path is incorrect');
                return;
            }
        }
    };
}
function setEnv(res) {
    try {
        res = JSON.parse(_PlatwareClient_pwCore__WEBPACK_IMPORTED_MODULE_4___default.a.AESDec(res.envConfig, _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envPropsKey));
        if (!res.enableLogging && window)
            window.console.log = function () { };
    }
    catch (error) {
        alert('Error while decrypting Enviornment');
        console.error(error);
    }
    _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].envProps = res.envProps;
}
function reload(s) {
    var r = confirm('Unable to reload the env file.' + ' Error: ' + s + ' Do you want to reload?');
    if (r) {
        window.location.reload();
    }
    else {
        return;
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/decimal/Decimal/vahana/vahana-portal-authentication/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map