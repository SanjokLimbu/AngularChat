using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace AngularChat.Hubs
{
    public class Chathub : Hub
    {
        private readonly string _botUser;
        private readonly string _globalRoom;
        public Chathub()
        {
            _botUser = "My Chatbot";
            _globalRoom = "Lobby";
        }
        public async Task Join(string message)
        {
            //await Groups.AddToGroupAsync(Context.ConnectionId, _globalRoom);
            //await Clients.Group(_globalRoom).SendAsync("ReceiveMessage", $"{_botUser} : Welcome {message}");
            await Clients.All.SendAsync("ReceiveMessage", $"{_botUser} : Welcome {message}");
            //await Clients.All.SendAsync("ReceiveMessage", $"{_botUser} : Welcome {message}");
        }
    }
}
