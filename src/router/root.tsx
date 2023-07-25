
import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { useEffect } from 'react'
import { getContacts, createContact } from "@/contacts";

// 👉 加载器
export async function loader({ request }) {
  // const contacts = await getContacts();
  // console.log('contacts', { contacts })
  // return { contacts };

  // 👉 根据查询 获取列表
  // 👉 提交 GET 表单与单击表单与链接相同 ,都只是 URL 发生了变化 ,为过滤添加的代码是在加载器中 ,它是一个普通的页面导航
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  // return { contact };
  // 👉 重定向到编辑页
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  // 👉 为搜索添加一些即时UI反馈
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              // 👉 从加载器返回q，并将其设置为搜索字段的默认值
              defaultValue={q}
              // 👉 输入值改变时提交查询
              onChange={(event) => {
                // 👉 为了避免每次输入表单都会被添加到历史堆栈中，可以将历史堆栈中的当前条目替换为下一页，而不是将其推入其中。
                // 👉 在这里可以使用 useSubmit 的replace属性
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              // 👉 currentTarget是事件附加的DOM节点, currentTarget.form是输入的父Form节点, submit函数将序列化并提交您传递给它的任何表单
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map(contact => (
                <li key={contact.id}>
                  {/* 👉 NavLink : 实现选中的菜单挂载 */}
                  <NavLink to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        
      </div>
      {/* 👉 切换菜单导航迟钝的原因: 当用户浏览应用程序时，React 路由器会保留旧页面，因为数据正在加载到下一页
          👉 解决方法: 在数据加载完成之前保持原来的状态，加载完成之后再路由跳转
          ( useNavigation : 解决 UI 界面响应迟钝的问题 ) */}
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}