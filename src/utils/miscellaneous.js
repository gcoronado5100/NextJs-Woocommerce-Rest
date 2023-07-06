import DOMPurify from "dompurify";

/**
 * Sanitize markup or text when used inside dangeoruslysetInnerHTML
 *
 * @param {string} content Plain or html string
 *
 * @returns {string} sanitized string
 *
 */

export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};
