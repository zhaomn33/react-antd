import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "@/contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log('formData', formData)

  // 👉 <input />的name属性 使每个字段都可以通过 formData.get(name) 来访问
  const firstName = formData.get("first");
  console.log('firstName', firstName)

  // 👉 转换成对象参数 将读取到的参数，通过 Object.fromEntries 方法将 数组对象转化为对象
  const updates = Object.fromEntries(formData);
  console.log('updates', updates)
  
  // 👉 将参数转给调用接口同时更新路由参数
  await updateContact(params.contactId, updates);
  // 👉 重定向
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</button>
      </p>
    </Form>
  );
}