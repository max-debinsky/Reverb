const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const { execute } = require("./play");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Kicks the bot."),
    execute: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue) {
            await interaction.reply("There is no song playing.");
            return;
        }

        queue.destroy();

        await interaction.reply("Bye bye. 👋");
    }
}