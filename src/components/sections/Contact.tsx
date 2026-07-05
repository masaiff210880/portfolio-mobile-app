import { useState } from "react";
import { Linking, Pressable, Text, TextInput, View } from "react-native";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react-native";

import { Button } from "@/components/ui/Button";
import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/config";
import { socials } from "@/data/data";
import { SocialIcon, WhatsappIcon } from "@/lib/icons";
import { useTheme } from "@/theme/ThemeProvider";

const { owner, contactRecipient } = siteConfig;
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contactRecipient}`;
const open = (url: string) => Linking.openURL(url).catch(() => {});

type Status = "idle" | "sending" | "success" | "error";

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: "email-address" | "default";
}) {
  const { colors } = useTheme();
  return (
    <View>
      <Text className="mb-1.5 text-sm font-medium text-content">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors["text-muted"]}
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          color: colors.text,
          textAlignVertical: multiline ? "top" : "center",
        }}
        className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm"
        {...(multiline ? { numberOfLines: 5 } : {})}
      />
    </View>
  );
}

export function Contact() {
  const { colors } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim() || "New message";
    const message = form.message.trim();
    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Please fill in your name, email and message.");
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `📬 New portfolio enquiry from ${name} — ${subject}`,
          _template: "box",
          _captcha: "false",
          Name: name,
          Email: email,
          Subject: subject,
          Message: message,
        }),
      });
      const result = await res.json().catch(() => ({}) as any);
      if (
        res.ok &&
        (result.success === true ||
          result.success === "true" ||
          /activat/i.test(result.message || ""))
      ) {
        setStatus("success");
        setFeedback("Thanks! Your message is on its way — I'll reply soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(
          result.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
    setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 5000);
  };

  const sending = status === "sending";
  const icon = sending
    ? Loader2
    : status === "success"
      ? CheckCircle2
      : status === "error"
        ? AlertCircle
        : Send;
  const label = sending
    ? "Sending…"
    : status === "success"
      ? "Message sent!"
      : status === "error"
        ? "Try again"
        : "Send message";

  return (
    <Section>
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something great"
        subtitle="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <View className="mt-10 gap-8">
        {/* Info */}
        <Reveal>
          <View className="gap-4">
            <Pressable onPress={() => open(`mailto:${owner.email}`)}>
              <Glass className="flex-row items-center gap-4 rounded-2xl p-5">
                <View className="size-12 items-center justify-center rounded-xl bg-surface-2">
                  <Mail size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted">Email</Text>
                  <Text className="font-medium text-content">
                    {owner.email}
                  </Text>
                </View>
              </Glass>
            </Pressable>

            <Glass className="flex-row items-center gap-4 rounded-2xl p-5">
              <View className="size-12 items-center justify-center rounded-xl bg-surface-2">
                <MapPin size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-muted">Location</Text>
                <Text className="font-medium text-content">
                  {owner.location}
                </Text>
              </View>
            </Glass>

            {owner.phones.map((p) => (
              <Glass
                key={p.tel}
                className="flex-row items-center gap-4 rounded-2xl p-5"
              >
                <View className="size-12 items-center justify-center rounded-xl bg-surface-2">
                  <Phone size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm text-muted">Phone</Text>
                  <Text className="font-medium text-content">{p.display}</Text>
                </View>
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={() => open(`tel:${p.tel}`)}
                    className="size-10 items-center justify-center rounded-xl border border-border"
                  >
                    <Phone size={18} color={colors["text-muted"]} />
                  </Pressable>
                  <Pressable
                    onPress={() => open(`https://wa.me/${p.wa}`)}
                    className="size-10 items-center justify-center rounded-xl border border-border"
                  >
                    <WhatsappIcon size={20} color="#25D366" />
                  </Pressable>
                </View>
              </Glass>
            ))}

            <Glass className="rounded-2xl p-5">
              <Text className="mb-3 text-sm text-muted">Find me online</Text>
              <View className="flex-row gap-2">
                {socials.map((s) => (
                  <Pressable
                    key={s.name}
                    onPress={() => open(s.href)}
                    className="size-11 items-center justify-center rounded-xl border border-border"
                  >
                    <SocialIcon
                      kind={s.kind}
                      size={20}
                      color={colors["text-muted"]}
                    />
                  </Pressable>
                ))}
              </View>
            </Glass>
          </View>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <Glass className="gap-4 rounded-2xl p-6">
            <Field
              label="Name"
              value={form.name}
              onChangeText={set("name")}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              value={form.email}
              onChangeText={set("email")}
              placeholder="jane@company.com"
              keyboardType="email-address"
            />
            <Field
              label="Subject"
              value={form.subject}
              onChangeText={set("subject")}
              placeholder="Project inquiry"
            />
            <Field
              label="Message"
              value={form.message}
              onChangeText={set("message")}
              placeholder="Tell me about it…"
              multiline
            />
            <Button
              size="lg"
              fullWidth
              icon={icon}
              disabled={sending}
              onPress={onSubmit}
            >
              {label}
            </Button>
            {feedback ? (
              <Text
                className="text-center text-sm"
                style={{
                  color: status === "error" ? colors.accent : colors.primary,
                }}
              >
                {feedback}
              </Text>
            ) : null}
          </Glass>
        </Reveal>
      </View>
    </Section>
  );
}
