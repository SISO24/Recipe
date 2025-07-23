import React from "react";
import Footer from "./Footer"; // Assuming Footer is in the same directory or correctly imported

export default function Contact() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Header Section - Same as About Us */}
      <div className="w-full h-24 bg-black flex items-center justify-center shadow-md">
        <h1 className="text-orange-600 text-5xl font-extrabold tracking-wide">
          Contact Us
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white my-8 mx-auto rounded-lg shadow-xl max-w-4xl">
        <p className="text-xl text-gray-800 text-center leading-relaxed mb-6">
          Have questions, feedback, or just want to say hello? We'd love to hear
          from you! Reach out to us using the information below or fill out the
          form.
        </p>

        {/* Contact Information Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              Our Details
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@tastehub.com"
                className="text-blue-600 hover:underline"
              >
                support@tastehub.com
              </a>
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
              Send us a Message
            </h2>
            <form className="w-full space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
