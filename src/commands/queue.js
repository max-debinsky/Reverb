const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { execute } = require("./play");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Queues the current song."),
  execute: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guild);

    if (!queue || !queue.playing) {
      await interaction.reply("There is no song playing.");
      return;
    }

    const queueString = queue.tracks
      .slice(0, 10)
      .map((song, i) => {
        return `${i + 1})  [${song.duration}]\` ${song.title} - <@${
          song.requrestedBy.id
        }>`;
      })
      .join("\n");

    const currentSong = queue.current;

    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `**Currently Playing: **\n\` ${currentSong.title} - <@${currentSong.requrestedBy.id}> \n\n**Queue:**\n${queueString}`
          )
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
