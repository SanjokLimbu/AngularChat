using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularChat.Hubs
{
    public class Chathub : Hub
    {
        private readonly string _botUser;
        public Chathub()
        {
            _botUser = "My Chatbot";
        }
        public async Task Join(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{_botUser} : Welcome {message}");
        }
    }
}
