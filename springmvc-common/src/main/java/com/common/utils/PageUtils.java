package com.common.utils;

import java.util.ArrayList;
import java.util.List;

import com.github.pagehelper.PageInfo;

/**
 * ClassName: PageUtils 
 * @Description: TODO
 * @author liwb
 * @date 2016年7月5日
 *
 */
 
public class PageUtils<T> extends PageInfo<T> {

	/**
	 * @Fields serialVersionUID : TODO
	 */
	private static final long serialVersionUID = 1L;

	public PageUtils(List<T> rows) {
		super(rows);
	}

	public PageUtils(List<T> rows, int navigatePages) {
		super(rows, navigatePages);
	}
	
	public PageUtils(List<T> rows, List<T> footer) {
		super(rows);
		if (rows == null || rows.size() == 0) {
			footer=new ArrayList<T>();
		}
		setFooter(footer);
	}

	/**
	 * 因为easyui不认识list属性，所以扩展一个跟easyui对应的结果集属性
	 */
	private List<T> rows;
	
	/**
	 * @Fields footer : easyui footer合计属性
	 */
	private List<T> footer;

	public List<T> getRows() {
		rows = super.getList();
		return rows;
	}
	
	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	
	public List<T> getFooter() {
		return footer;
	}

	
	public void setFooter(List<T> footer) {
		this.footer = footer;
	}
}
