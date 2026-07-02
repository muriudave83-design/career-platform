import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-black text-[#111827] mb-6">
            Contact JoinNexiva
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with Kenya's modern internship and graduate opportunities platform.
            We welcome recruiters, employers, universities, partners and students.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* CONTACT FORM */}

          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Send Us A Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />

              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

          {/* CONTACT DETAILS */}

          <div className="space-y-8">

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">
                Business & Recruiter Inquiries
              </h3>

              <p className="text-gray-600">
                info@joinnexiva.com
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">
                Community & Partnerships
              </h3>

              <p className="text-gray-600">
                hello@joinnexiva.com
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">
                Phone Numbers
              </h3>

              <p className="text-gray-600">
                0722 892 744
              </p>

              <p className="text-gray-600">
                0707 045 860
              </p>
            </div>

            <div className="bg-[#E8F5E9] rounded-3xl p-8 border border-[#C8E6C9]">
              <h3 className="text-2xl font-bold text-[#111827] mb-4">
                Why Contact JoinNexiva?
              </h3>

              <p className="text-gray-700">
                Recruit top student talent, post internship opportunities,
                discuss partnerships, collaborate with universities,
                or learn how JoinNexiva can support youth employment in Kenya.
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
