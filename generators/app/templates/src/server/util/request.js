import _ from 'lodash'
import fetch from 'node-fetch'

/* Class used to make http requests */
export class Request {
  /**
   * Create a Request
   * @param {Object} options - Object to hold constructor options.
   * @param {Object} options.headers - The headers to set for the request.
   * @param {Object} options.cookies - The cookie headers to set for the request.
   */
  constructor (options = {}) {
    const { headers = {}, cookies = '' } = options

    let headersObj = new Headers(headers)
    headersObj.append('Cookie', cookies)
    this.options = {
      headers: headersObj
    }
  }

  /**
   * Replaces all headers (except Cookie) with new set of headers
   * @param {Object} headers - The new headers
   */
  setHeaders (headers = {}) {
    let cookies = this.options.headers.get('Cookie')
    let headersObj = new Headers(headers)
    headersObj.append('Cookie', cookies)

    _.set(this.options, 'headers', headersObj)
  }

  /**
   * Replaces cookie header value with new cookies
   * @param {Object} cookies - The new cookies
   */
  setCookies (cookies = '') {
    this.options.headers.set('Cookie', cookies)
  }

  /**
   * Make an http GET request
   * @param {String} uri - Request path
   * @param {Object} options - Request options, optional
   * @returns {Promise}
   */
  get (uri, options = {}) {
    return this._makeRequest({ uri, options })
  }

  /**
   * Make an http POST request with data in body
   * @param {String} uri - Request path
   * @param {Object} data - Request body, optional
   * @param {Object} options - Request options, optional
   * @returns {Promise}
   */
  post (uri, data = {}, options = {}) {
    _.set(options, 'body', data)
    _.set(options, 'headers.content-length', Buffer.byteLength(JSON.stringify(data)))
    return this._makeRequest({ uri, options, method: 'POST' })
  }

  /**
   * Sends the http request, for list of options see https://github.com/request/request-promise
   * @param {String} uri - Request path
   * @param {Object} options - Request options, optional
   * @param {String} method - Request method, defaults to GET
   * @returns {Promise}
   * @private
   */
  _makeRequest ({ uri, options = {}, method = 'GET' }) {
    this._checkUri(uri)
    options = _.merge({}, this.options, options)
    _.assignIn(options, { method })

    return fetch(uri, options)
  }

  /**
   * Determine if a uri has been provide, else throws
   * @param {String} uri - Request path
   * @private
   */
  _checkUri (uri) {
    if (!uri) {
      throw new Error('No uri provided to request')
    }
  }
}
