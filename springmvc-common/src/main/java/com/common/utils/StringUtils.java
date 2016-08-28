package com.common.utils;

import java.io.UnsupportedEncodingException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringEscapeUtils;

/**
 * 字符串工具类, 继承org.apache.commons.lang3.StringUtils类
 * @author ThinkGem
 * @version 2013-05-22
 */
public class StringUtils extends org.apache.commons.lang3.StringUtils {

	public static String lowerFirst(String str) {
		if (StringUtils.isBlank(str)) {
			return "";
		} else {
			return str.substring(0, 1).toLowerCase() + str.substring(1);
		}
	}

	public static String upperFirst(String str) {
		if (StringUtils.isBlank(str)) {
			return "";
		} else {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	}

	/**
	 * 替换掉HTML标签方法
	 */
	public static String replaceHtml(String html) {
		if (isBlank(html)) {
			return "";
		}
		String regEx = "<.+?>";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(html);
		String s = m.replaceAll("");
		return s;
	}

	/**
	 * 缩略字符串（不区分中英文字符）
	 * @param str 目标字符串
	 * @param length 截取长度
	 * @return
	 */
	public static String abbr(String str, int length) {
		if (str == null) {
			return "";
		}
		try {
			StringBuilder sb = new StringBuilder();
			int currentLength = 0;
			for (char c : replaceHtml(StringEscapeUtils.unescapeHtml4(str))
					.toCharArray()) {
				currentLength += String.valueOf(c).getBytes("GBK").length;
				if (currentLength <= length - 3) {
					sb.append(c);
				} else {
					sb.append("...");
					break;
				}
			}
			return sb.toString();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 缩略字符串（替换html）
	 * @param str 目标字符串
	 * @param length 截取长度
	 * @return
	 */
	public static String rabbr(String str, int length) {
		return abbr(replaceHtml(str), length);
	}

	/**
	 * 转换为Double类型
	 */
	public static Double toDouble(Object val) {
		if (val == null) {
			return 0D;
		}
		try {
			return Double.valueOf(trim(val.toString()));
		} catch (Exception e) {
			return 0D;
		}
	}

	/**
	 * 转换为Float类型
	 */
	public static Float toFloat(Object val) {
		return toDouble(val).floatValue();
	}

	/**
	 * 转换为Long类型
	 */
	public static Long toLong(Object val) {
		return toDouble(val).longValue();
	}

	/**
	 * 转换为Integer类型
	 */
	public static Integer toInteger(Object val) {
		return toLong(val).intValue();
	}

	/**
	 *
	 * @desc 判断一个字符串是否为空或者null
	 *
	 * @param str 被判断字符串
	 * @return 判断结构
	 */
	public static boolean isNullOrEmpty(String str) {
		if (str == null) {
			return true;
		}
		if ("".equals(str.trim())) {
			return true;
		}
		return false;
	}

	/**
	 *
	 * @desc 检测全部参数是否为空，有一个为空则返回false，全部都不为空则返回true
	 *
	 * @param cs 多个字符串
	 * @return boolean
	 */
	public static boolean isNotEmptyAll(CharSequence... cs) {
		for (CharSequence charSequence : cs) {
			// 出现一个为空就返回false
			if (!isNotEmpty(charSequence)) {
				return false;
			}
		}
		// 全部都不为空则返回true
		return true;
	}

	/**
	 * 正则验证 add by Laven
	 *
	 * @param regex 正则
	 * @param content 验证内容
	 * @return 验证结果
	 */
	public static boolean checkRegex(String regex, String content) {
		if (StringUtils.isEmpty(content)) {
			return false;
		}
		return Pattern.compile(regex).matcher(content).matches();
	}

	/**
	 * 手机号验证 add by Laven
	 *
	 * @param mobile 手机号码
	 * @return 验证结果
	 */
	public static boolean checkMobile(String mobile) {
		return checkRegex("^1(3[0-9]|5[0-35-9]|8[0-9]|4[57]|7[0678])[0-9]{8}$",
				mobile);
	}

	/**
	 * 电话号码验证 add by Laven
	 *
	 * @param telplone 电话号码 区号（可选）-固号-分机号（可选）
	 * @return 验证结果
	 */
	public static boolean checkTelplone(String telplone) {
		return checkRegex(
				"^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$",
				telplone);
	}

	/**
	 * 长度验证，如果字符串长度大于length则验证不通过 add by Laven
	 *
	 * @param str 验证字符串
	 * @param length 验证长度
	 * @return 验证结果
	 */
	public static boolean checkLength(String str, int length) {
		int strLength = StringUtils.length(str);
		return length >= strLength;
	}

	/**
	 * 
	 * @desc 用一个字符串和多个字符串比较   区分大小写 add by wulm
	 *
	 * @param str 用户传入的字符
	 * @param equals	用来比较的字符
	 * @return 存在一个相等则返回True，都不相等则返回false
	 */
	public static boolean equalsOneInAll(String str, String... equals) {
		boolean eq = false;
		if (str != null) {
			for (String s : equals) {
				if (str.equals(s)) {
					eq = true;
					break;
				}
			}
		}
		return eq;
	}

	/**
	 * 
	 * @desc 用一个字符串和多个字符串比较   忽略大小写   add by wulm
	 *
	 * @param str 用户传入的字符
	 * @param equals	用来比较的字符
	 * @return 存在一个相等则返回True，都不相等则返回false
	 */
	public static boolean equalsOneInAllIgnoreCase(String str, String... equals) {
		boolean eq = false;
		if (str != null) {
			for (String s : equals) {
				if (str.equalsIgnoreCase(s)) {
					eq = true;
					break;
				}
			}
		}
		return eq;
	}
}
