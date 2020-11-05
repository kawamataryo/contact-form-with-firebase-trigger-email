type FormPayload = {
  name: string;
  email: string;
  content: string;
};
export const adminMailBody = (params: FormPayload) => {
  return `
以下内容で問い合わせフォームよりお問い合わせを受けつけました。

お名前:
${params.name}

メールアドレス:
${params.email}

内容:
${params.content}
`;
};
export const thanksMailBody = (params: FormPayload) => {
  return `
${params.name} 様

お問い合わせありがとうございます。
以下内容でお問い合わせを受け付けました。

お名前:
${params.name}

メールアドレス:
${params.email}

内容:
${params.content}

後ほど担当者よりご連絡を差し上げます。
よろしくお願いいたします。
`;
};
